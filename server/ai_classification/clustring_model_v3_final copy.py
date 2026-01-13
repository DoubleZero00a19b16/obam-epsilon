import json
import numpy as np
import os
import sys
import io
from collections import Counter

# Fix Windows console encoding for Azerbaijani characters
if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# Workaround for joblib/Python 3.13 issue on Windows
os.environ['LOKY_MAX_CPU_COUNT'] = '4'

from sentence_transformers import SentenceTransformer
from sklearn.cluster import KMeans, AgglomerativeClustering
from sklearn.metrics import silhouette_score
from hdbscan import HDBSCAN
import warnings

warnings.filterwarnings('ignore')

class AzerbaijaniAspectClustering:
    def __init__(self, model_name='paraphrase-multilingual-MiniLM-L12-v2'):
        """Initialize the clustering model for product review analysis (in-store purchases only)."""
        self.model = SentenceTransformer(model_name)
        self.embeddings = None
        self.cluster_labels = None
        self.reviews = None
        
        # Define product problem categories - PHYSICAL STORE ONLY (no delivery, service, or location)
        self.problem_keywords = {
            'qiymət': {
                'keywords': [
                    'qiymət', 'qiyməti', 'qiymətə', 'qiymətindən', 'qiymətin',
                    'baha', 'bahalı', 'bahadır',
                    'dəyməz', 'layiq deyil',
                    'pul əvəz deyil', 'pula dəyməz',
                    'ucuz deyil', 'ədalətli deyil', 'ədalətsiz',
                    'yüksək qalır', 'artıblar', 'artıb'
                ],
                'label': 'Yüksək qiymət'
            },
            'keyfiyyət': {
                'keywords': [
                    'keyfiyyət', 'keyfiyyəti', 'keyfiyyətli', 'keyfiyyətsiz',
                    'işləmir', 'işləmədi',
                    'pozulub', 'pozuldu',
                    'zəif', 'zəifdir',
                    'xarab', 'xarabdır',
                    'sındı', 'sınıq',
                    'qırıldı', 'qırıq',
                    'yararsız', 'yararsızdır',
                    'dayanıqlı deyil',
                    'fabrik defekti',
                    'aşınır',
                    'mexanizmi xarab',
                    'düyməsi pozulub'
                ],
                'label': 'Pis keyfiyyət'
            },
            'dad': {
                'keywords': [
                    'dad', 'dadı', 'dadlı', 'dadın',
                    'dadı yoxdur', 'dadsız',
                    'ləzzət', 'ləzzəti', 'ləzzətsiz',
                    'acı', 'acıdır',
                    'duz', 'duzlu',
                    'şor', 'şordu',
                    'turş', 'turşdur',
                    'süni dad', 'kimyəvi dad',
                    'yetişməmiş',
                    'yeməyə dəyməz',
                    'dad balansı'
                ],
                'label': 'Dad problemi'
            },
            'iy': {
                'keywords': [
                    'iyi pis', 'iyi çox', 'iyi dözülməz',
                    'pis iy', 'güclü iy', 'kəskin iy', 
                    'iyrənc iy', 'kimyəvi iy', 'plastik iy',
                    'xoşagəlməz iy', 'qəribə iy',
                    'iy gəlir', 'iy verir', 'iy var',
                    'qoxu', 'qoxusu', 'qoxur',
                    'pis qoxu', 'qəribə qoxu', 'kimyəvi qoxu'
                ],
                'label': 'İy problemi'
            },
            'ölçü': {
                'keywords': [
                    'ölçü', 'ölçüsü', 'ölçüdən',
                    'ölçü uyğun deyil', 'ölçü düz deyil', 'ölçü problemi',
                    'kiçik gəldi', 'böyük gəldi', 'böyük oldu',
                    'dar gəldi', 'dar', 'geniş gəldi', 'geniş',
                    'uzun', 'uzundur', 'qısa',
                    'sığmır',
                    'xl sifariş', 'l gəldi', 'm gəldi', 's gəldi',
                    'ölçü cədvəli', 'standart ölçü',
                    'ayaqqabı ölçü',
                    'geyindim'
                ],
                'label': 'Ölçü problemi'
            },
            'görünüş': {
                'keywords': [
                    'görünüş', 'görünüşü',
                    'rəng', 'rəngi', 'rəng ton',
                    'forma', 'forması',
                    'şəkil', 'şəkildə', 'şəkildən fərqli', 'şəkilə oxşamır',
                    'fərqli', 'fərqlidir', 'başqa', 'başqadır',
                    'oxşamır', 'eyni deyil',
                    'dizayn', 'dizaynla',
                    'təsvir', 'təsvirdən',
                    'model fərqli',
                    'solğun', 'parlaq deyil',
                    'plastik görünür', 'ucuz görünür', 'köhnə görünür'
                ],
                'label': 'Görünüş fərqli'
            },
            'miqdar': {
                'keywords': [
                    'miqdar', 'miqdarı',
                    'çatışmır', 'çatışmır',
                    'eksik', 'əksik',
                    'az', 'azdır', 'az gəlib',
                    'kifayət deyil', 'kifayət etmir',
                    'say', 'sayı', 'saydan az',
                    'çəki', 'çəkisi',
                    'həcm', 'həcmi',
                    'yarısı boş', 'boşdur',
                    'qutuda yazıldığından az',
                    'göstərilən saydan',
                    'içəridə çox az'
                ],
                'label': 'Az miqdar'
            },
            'tərkib': {
                'keywords': [
                    'tərkib', 'tərkibi', 'tərkibində',
                    'allergen', 'allergiya',
                    'maddə', 'maddələr',
                    'zərərli', 'ziyanlı',
                    'qida əlavə', 'e kodu',
                    'kimyəvi', 'kimyəvi maddə',
                    'təbii deyil',
                    'material', 'materiallar', 'materialdan',
                    'komponent',
                    'qoruyucu maddə'
                ],
                'label': 'Tərkib problemi'
            },
            'tarix': {
                'keywords': [
                    'tarix', 'tarixi', 'tarixli',
                    'son istifadə', 'istifadə tarixi', 'istifadə müddəti',
                    'keçib', 'keçmiş', 'bitib', 'bitir',
                    'köhnə', 'köhnədir',
                    'bayat',
                    'istehsal tarixi',
                    'təzə deyil',
                    'yaxındır'
                ],
                'label': 'Köhnə məhsul'
            },
            'qablaşdırma': {
                'keywords': [
                    'qablaşdırma', 'qablaşdırılıb',
                    'qab', 'qab üzərində',
                    'paket', 'paketi', 'paketdə',
                    'qutu', 'qutuda',
                    'zədə', 'zədəli', 'zədələnib',
                    'sınıq gəldi', 'qırılıb', 'qırılmış',
                    'əzilmiş', 'cırılmış',
                    'açılmış vəziyyət', 'açılıb',
                    'çat', 'çatlar',
                    'qorunmur',
                    'zəif qablaşdırma', 'pis qablaşdırma',
                    'şüşə qırılmış'
                ],
                'label': 'Qablaşdırma problemi'
            },
            'etiket': {
                'keywords': [
                    'etiket', 'etiketi', 'etiketdə', 'etiketində',
                    'məlumat yox', 'məlumat yoxdur',
                    'təlimat', 'təlimatı',
                    'yazı', 'yazılar',
                    'oxunmur', 'oxumaq',
                    'azərbaycanca deyil',
                    'dil',
                    'təsvir olunan',
                    'cırılmış etiket',
                    'səhv etiket',
                    'verilməyib',
                    'qiymət etiketi'
                ],
                'label': 'Etiket problemi'
            }
        }
        
    def detect_primary_aspect(self, review):
        """Detect the primary complaint aspect in a review using improved keyword matching."""
        review_lower = review.lower()
        aspect_scores = {}
        
        for aspect, data in self.problem_keywords.items():
            score = 0
            matched_keywords = []
            
            for keyword in data['keywords']:
                if keyword in review_lower:
                    # Weight longer keywords much more heavily (they're more specific)
                    word_count = len(keyword.split())
                    if word_count >= 3:
                        weight = 10  # Very specific phrases
                    elif word_count == 2:
                        weight = 5   # Specific phrases
                    else:
                        weight = 2   # Single words
                    
                    score += weight
                    matched_keywords.append(keyword)
            
            aspect_scores[aspect] = {
                'score': score,
                'keywords': matched_keywords
            }
        
        # Get the aspect with highest score
        max_aspect = max(aspect_scores, key=lambda x: aspect_scores[x]['score'])
        max_score = aspect_scores[max_aspect]['score']
        
        if max_score == 0:
            return None  # Will go to "Digər" cluster
        
        # Check if there's a clear winner (at least 1.5x higher than second place)
        sorted_aspects = sorted(aspect_scores.items(), key=lambda x: x[1]['score'], reverse=True)
        if len(sorted_aspects) > 1:
            first_score = sorted_aspects[0][1]['score']
            second_score = sorted_aspects[1][1]['score']
            
            # Clear winner
            if first_score >= second_score * 1.5:
                return sorted_aspects[0][0]
            # Close call - prefer the one with more specific keywords
            else:
                first_keywords = sorted_aspects[0][1]['keywords']
                second_keywords = sorted_aspects[1][1]['keywords']
                first_specificity = sum(len(k.split()) for k in first_keywords)
                second_specificity = sum(len(k.split()) for k in second_keywords)
                
                if first_specificity >= second_specificity:
                    return sorted_aspects[0][0]
                else:
                    return sorted_aspects[1][0]
        
        return max_aspect if max_score > 0 else None
    
    def encode_reviews(self, reviews):
        """Encode Azerbaijani reviews into semantic embeddings."""
        self.reviews = reviews
        self.embeddings = self.model.encode(reviews, convert_to_numpy=True, show_progress_bar=False)
        return self.embeddings
    
    def keyword_based_clustering(self):
        """Perform keyword-based clustering for better accuracy."""
        # First, detect primary aspect for each review
        review_aspects = []
        for review in self.reviews:
            aspect = self.detect_primary_aspect(review)
            review_aspects.append(aspect)
        
        # Create cluster labels based on aspects
        unique_aspects = list(set([a for a in review_aspects if a is not None]))
        
        if not unique_aspects:
            # All reviews go to "Digər" if no aspects detected
            self.cluster_labels = np.zeros(len(self.reviews), dtype=int)
            return self.cluster_labels
        
        aspect_to_cluster = {aspect: i for i, aspect in enumerate(unique_aspects)}
        
        # Add "Digər" cluster at the end
        diger_cluster = len(unique_aspects)
        
        # Assign cluster labels
        self.cluster_labels = []
        
        for aspect in review_aspects:
            if aspect is not None:
                self.cluster_labels.append(aspect_to_cluster[aspect])
            else:
                # No clear aspect detected -> goes to "Digər"
                self.cluster_labels.append(diger_cluster)
        
        self.cluster_labels = np.array(self.cluster_labels)
        return self.cluster_labels
    
    def find_optimal_k(self, min_k=2, max_k=8):
        """Find optimal number of clusters using Silhouette analysis."""
        n_reviews = len(self.reviews)
        
        if n_reviews < max_k:
            max_k = max(2, n_reviews // 2)
        
        silhouette_scores = []
        k_range = range(min_k, min(max_k + 1, n_reviews))
        
        for k in k_range:
            kmeans = KMeans(n_clusters=k, random_state=42, n_init=10)
            labels = kmeans.fit_predict(self.embeddings)
            score = silhouette_score(self.embeddings, labels)
            silhouette_scores.append(score)
        
        optimal_k = k_range[np.argmax(silhouette_scores)]
        return optimal_k
    
    def cluster_kmeans(self, n_clusters=None):
        """Perform K-Means clustering with optimal K."""
        if n_clusters is None:
            n_clusters = self.find_optimal_k()
        
        kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
        self.cluster_labels = kmeans.fit_predict(self.embeddings)
        return self.cluster_labels
    
    def cluster_agglomerative(self, n_clusters=None):
        """Perform Agglomerative clustering."""
        if n_clusters is None:
            n_clusters = self.find_optimal_k()
        
        clusterer = AgglomerativeClustering(n_clusters=n_clusters, linkage='ward')
        self.cluster_labels = clusterer.fit_predict(self.embeddings)
        return self.cluster_labels
    
    def cluster_hdbscan(self, min_cluster_size=2, min_samples=1):
        """Perform HDBSCAN clustering."""
        n_reviews = len(self.reviews)
        if min_cluster_size > n_reviews // 3:
            min_cluster_size = max(2, n_reviews // 5)
        
        clusterer = HDBSCAN(
            min_cluster_size=min_cluster_size, 
            min_samples=min_samples,
            metric='euclidean',
            cluster_selection_epsilon=0.3,
            core_dist_n_jobs=1
        )
        self.cluster_labels = clusterer.fit_predict(self.embeddings)
        return self.cluster_labels
    
    def generate_cluster_label(self, cluster_reviews):
        """Generate label by finding the most common aspect in the cluster."""
        aspect_counts = Counter()
        
        for review in cluster_reviews:
            aspect = self.detect_primary_aspect(review)
            if aspect:
                aspect_counts[aspect] += 1
        
        if not aspect_counts:
            return "Digər"
        
        # Get the most common aspect
        most_common_aspect = aspect_counts.most_common(1)[0][0]
        return self.problem_keywords[most_common_aspect]['label']
    
    def build_output(self, method='keyword', **kwargs):
        """Build the complete clustering output."""
        # Encode reviews
        self.encode_reviews(self.reviews)
        
        # Perform clustering
        if method == 'keyword':
            self.keyword_based_clustering()
        elif method == 'hdbscan':
            self.cluster_hdbscan(**kwargs)
        elif method == 'kmeans':
            self.cluster_kmeans(**kwargs)
        elif method == 'agglomerative':
            self.cluster_agglomerative(**kwargs)
        else:
            raise ValueError("Method must be 'keyword', 'hdbscan', 'kmeans', or 'agglomerative'")
        
        # Build output structure
        clusters = {}
        unique_labels = np.unique(self.cluster_labels)
        
        for label in unique_labels:
            if label == -1:  # HDBSCAN noise
                continue
            
            cluster_indices = np.where(self.cluster_labels == label)[0]
            cluster_reviews = [self.reviews[i] for i in cluster_indices]
            
            # Generate label
            cluster_label = self.generate_cluster_label(cluster_reviews)
            
            clusters[f"cluster_{label}"] = {
                "cluster_id": int(label),
                "cluster_label": cluster_label,
                "member_reviews": cluster_reviews,
                "review_count": len(cluster_reviews)
            }
        
        return clusters

def cluster_azerbaijani_reviews(reviews, method='keyword', **kwargs):
    """
    Main function to cluster Azerbaijani product reviews (physical store purchases).
    
    Args:
        reviews: List of Azerbaijani product reviews (3 stars or less)
        method: 'keyword' (recommended), 'hdbscan', 'kmeans', or 'agglomerative'
        **kwargs: Additional parameters for clustering method
    
    Returns:
        JSON object with product complaint clusters
    """
    reviews = [str(review).strip() for review in reviews if review and str(review).strip()]
    
    if len(reviews) < 2:
        return json.dumps({
            "error": "At least 2 reviews are required for clustering",
            "clusters": {}
        }, ensure_ascii=False, indent=2)
    
    # Initialize and run clustering
    clusterer = AzerbaijaniAspectClustering()
    clusterer.reviews = reviews
    clusters = clusterer.build_output(method=method, **kwargs)
    
    # Convert to JSON
    output = {
        "total_reviews": len(reviews),
        "total_clusters": len(clusters),
        "method": method,
        "clusters": clusters
    }
    
    return json.dumps(output, ensure_ascii=False, indent=2)


# Example usage
if __name__ == "__main__":
    # Comprehensive sample product reviews (150+ examples) - PHYSICAL STORE ONLY
    sample_reviews = [
        # Price complaints (Qiymət problemi) - 15 samples
        "Bu məhsulun qiyməti çox bahadır, bu qiymətə dəyməz",
        "Qiymət ədalətli deyil, çox bahadır",
        "Pul əvəz deyil, çox baha məhsuldur",
        "Qiymət normaldan 2 dəfə bahadır",
        "Bu qiymətə belə keyfiyyət gözləmirdim, çox bahadır",
        "Market qiymətindən çox fərqlidir, baha satılır",
        "Eyni məhsulu başqa yerdə ucuz almışam",
        "Qiymət uyğun deyil, ucuz deyil",
        "Bahalı məhsul, bu qədər pula dəyməz",
        "Sadəcə qiyməti baha olduğu üçün bəyənmədim",
        "Qiymət çox yüksək qalır",
        "Bu məhsul bu qiymətə layiq deyil",
        "Çox bahadır, almağa dəyməz",
        "Digər brendlərdən bahadır, səbəbini anlamıram",
        "Qiyməti iki misli artıblar, ədalətsizdir",
        
        # Quality complaints (Keyfiyyət problemi) - 20 samples
        "Məhsulun keyfiyyəti pis idi, işləmir",
        "Keyfiyyət çox zəifdir, pozulub",
        "Məhsul xarabdır, istifadə edə bilmirəm",
        "Keyfiyyətsiz məhsuldur, tövsiyə etmirəm",
        "Bir dəfə istifadə etdim, dərhal sındı",
        "Plastik hissəsi çox zəifdir, qırıldı",
        "Keyfiyyət heç yaxşı deyil, yararsızdır",
        "Məhsul işləmir, düyməsi pozulub",
        "Material çox pis keyfiyyətlidir",
        "İkinci gündə pozuldu, keyfiyyət sıfırdır",
        "Çox tez xarab oldu, dayanıqlı deyil",
        "Keyfiyyət şəkildə göstərilənə oxşamır",
        "Ucuz materialdan hazırlanıb, keyfiyyətsizdir",
        "Bir həftə istifadə etdim, artıq işləmir",
        "Məhsulun mexanizmi xarabdır",
        "Keyfiyyət heç gözləntilərə cavab vermir",
        "Çox tez aşınır, keyfiyyət aşağıdır",
        "İşləmir, fabrik defekti var",
        "Keyfiyyət çox pis, dərhal geri qaytardım",
        "Məhsul işləmədi, təzə olmasına baxmayaraq",
        
        # Taste complaints (Dad problemi) - 15 samples
        "Dad pis idi, çox duzlu və şor idi",
        "Məhsulun dadı yoxdur, ləzzətsizdir",
        "Dadı çox acıdır, yeyilmir",
        "Şirniyyatın dadı süni, kimyəvi dadı var",
        "Çox turşdur, dad balansı pozulub",
        "Dadı təbii deyil, qoruyucu maddələrin dadı gəlir",
        "Heç ləzzət almadım, dad çox pisdir",
        "Ət məhsulunun dadı köhnədir",
        "Dadı şəkərdən başqa heç nə hiss olunmur",
        "Çox şordu, yeməyə dəyməz",
        "Dadı ümumiyyətlə yoxdur, ləzzətsiz",
        "Çay dadı vermir, suyun dadını verir",
        "Meyvənin dadı yoxdur, yetişməmiş",
        "Qida əlavələrinin dadı çox güclüdür",
        "Dad balansı pis, çox acıdır",
        
        # Smell complaints (İy problemi) - 12 samples
        "İyi və dadı pis idi, bəyənmədim",
        "Məhsulun iyi çox pisdir, iyrəncdir",
        "Kəskin iy gəlir, qoxusu xoşagəlməz deyil",
        "Plastik iy verir, kimyəvi qoxusu var",
        "Qəribə iy gəlir məhsuldan",
        "İyi dözülməzdir, başım ağrıyır",
        "Xoşagəlməz qoxusu var",
        "Güclü kimyəvi iy gəlir",
        "Qoxusu çox pis, istifadə edə bilmirəm",
        "İyrənc iy verir, normal deyil",
        "Pis qoxu gəlir məhsuldan",
        "İyi çox güclüdür və xoşagəlməzdir",
        
        # Size complaints (Ölçü problemi) - 15 samples
        "Ölçü uyğun deyil, çox kiçik gəldi",
        "Ölçü fərqlidir, böyük gəldi",
        "Şəkildə göstərilən ölçüdən kiçikdir",
        "XL sifariş etdim, amma L gəldi",
        "Ölçü cədvəlinə uyğun deyil",
        "Çox dar gəldi, ölçü düz deyil",
        "Geyindim, çox böyük oldu",
        "Uzunluğu qısa, ölçü problemi var",
        "Ayaqqabı ölçüsü kiçik gəldi",
        "Standart ölçüdən fərqlidir",
        "Ölçü seçimi düzgün deyil, uyğun gəlmədi",
        "Çox geniş gəldi, istifadə edə bilmirəm",
        "Qol hissəsi çox uzundur, ölçü yanlışdır",
        "Ölçüsü çox kiçikdir, sığmır",
        "Normal ölçüdən böyükdür, uyğun deyil",
        
        # Appearance complaints (Görünüş problemi) - 12 samples
        "Məhsul şəkildən fərqlidir, rəngi başqadır",
        "Şəkildə göründüyü kimi deyil, fərqlidir",
        "Rəngi açıq gəldi, şəkildəki ilə eyni deyil",
        "Forma fərqlidir, şəkilə oxşamır",
        "Dizayn başqadır, təsvirdən fərqli",
        "Məhsulun görünüşü pis, köhnə görünür",
        "Rəngi solğundur, şəkildəki parlaq deyil",
        "Model fərqlidir, istədiyim deyil",
        "Şəkildəki dizaynla heç oxşarlığı yoxdur",
        "Görünüşü ucuz, plastik görünür",
        "Rəng tonları tamamilə fərqlidir",
        "Material şəkildəkindən fərqli görünür",
        
        # Quantity complaints (Miqdar problemi) - 10 samples
        "Miqdar çox azdır, çatışmır",
        "Qutuda yazıldığından az məhsul var",
        "Yarısı boşdur, miqdar kifayət deyil",
        "Çəkisi göstərilənə uyğun deyil, az gəlib",
        "Paketi açdım, içəridə çox az məhsul var",
        "Miqdarı şəkildəkindən azdır",
        "Sayı çatışmır, əksik gəlib",
        "Təsvir olunanın yarısı qədər gəlib",
        "Həcmi kiçikdir, miqdar az",
        "Paketdə göstərilən saydan az gəlib",
        
        # Ingredient/composition complaints (Tərkib problemi) - 8 samples
        "Tərkibində allergen maddələr var, yazmayıblar",
        "Tərkib məlumatı düzgün deyil",
        "Qida əlavələri çoxdur, təbii deyil",
        "Tərkibində zərərli maddələr olduğunu gördüm",
        "E kodu çox, sağlamlığa ziyanlıdır",
        "Tərkibi etiketdə göstərilməyib",
        "Kimyəvi maddələr çoxdur tərkibində",
        "Tərkibdəki materiallar keyfiyyətsizdir",
        
        # Expiration date complaints (Tarix problemi) - 10 samples
        "Məhsul köhnədir, son istifadə tarixi keçib",
        "Tarixi keçmiş məhsul satırlar",
        "Son istifadə müddəti çox yaxındır",
        "Bayat məhsuldur, tarixi köhnədir",
        "İstehsal tarixi çox köhnədir",
        "Bir həftəyə tarixi bitir, təzə deyil",
        "Məhsul xarab olub, tarixi keçib",
        "Köhnə məhsul, istifadə tarixi bitib",
        "Tarix etiketində oxunmur, köhnə görünür",
        "Son istifadə müddəti keçmiş məhsul",
        
        # Packaging complaints (Qablaşdırma problemi) - 12 samples
        "Qablaşdırma zədəli idi, məhsul sınıq gəldi",
        "Paket açılmış vəziyyətdə idi",
        "Qablaşdırma zəif, məhsul qorunmur",
        "Qutu əzilmiş, içəridəki məhsul zədələnib",
        "Qablaşdırma pis, məhsul qırılıb",
        "Paket cırılmışdı, məhsul bayıra çıxmışdı",
        "Qablaşdırma keyfiyyətsiz, sınıq idi",
        "Şüşə qırılmış vəziyyətdə idi, qablaşdırma zəif",
        "Qab üzərində çatlar var, zədəlidir",
        "Plastik qablaşdırma sınıb, məhsul çıxıb",
        "Qablaşdırma açılmış idi, təhlükəsiz deyil",
        "Qab zədəli idi, içəridə hər şey qarışıb",
        
        # Label/information complaints (Etiket problemi) - 8 samples
        "Etiketdə məlumat yoxdur, nə olduğu bəlli deyil",
        "Təlimat azərbaycanca deyil, başa düşülmür",
        "Etiket cırılmış, məlumatları oxumaq olmur",
        "İstifadə təlimatı verilməyib",
        "Etiketdə tərkib haqqında məlumat yoxdur",
        "Qiymət etiketi yapışmayıb, yoxdur",
        "Etiket səhvdir, başqa məhsulun etiketi",
        "Məlumat etiketində oxunmayan yazılar var",
        
        # Additional mixed complaints - 10 samples
        "Məhsul çox pis qablaşdırılıb və qiyməti də baha",
        "Keyfiyyəti zəif, üstəlik ölçü də uyğun deyil",
        "Dad pisdir və miqdar da az gəlib",
        "Qiymət baha, amma keyfiyyət heç yaxşı deyil",
        "Görünüşü şəkildən fərqli və qablaşdırması da zədəli",
        "Ölçü kiçik gəldi və materialı da keyfiyyətsiz",
        "Son istifadə tarixi yaxın və dadı da pis",
        "Miqdar az və tərkibi də təbii deyil",
        "Keyfiyyət pis, pozulub və işləmir",
        "Rəngi fərqli və material də keyfiyyətsiz",
        
        # Ambiguous/Other complaints (should go to Digər) - 8 samples
        "Bəyənmədim",
        "Yaxşı deyil",
        "Problemli məhsuldur",
        "Narazıyam",
        "Pis təcrübə oldu",
        "Gözləntilərimi doğrultmadı",
        "Razı qalmadım",
        "Tövsiyə etmirəm",
        "Pox kimi dadı var",
        "Elə bil içinə işiyiblər",
        "ÇOX ÇOX ÇOX ÇOX POX BİŞEYDİ",
        "Sikilmişin heç dadı da yoxdu",
        "Bunu hansı şirkət ixrac edir? Tərbiyəmi pozmaq istəmirəm lakin dadı sikimin başı kimi idi da. Sikim onnari varyoxun, durduğum yerdə məni əsəbləşdirirlər peysərlər!!!!!"
    ]
    
    # Run keyword-based clustering (RECOMMENDED)
    print("Running Final Keyword-Based clustering (Physical Store Only)...")
    print(f"Total reviews to cluster: {len(sample_reviews)}")
    print("="*80)
    
    result_keyword = cluster_azerbaijani_reviews(sample_reviews, method='keyword')
    print("\nKeyword-Based Clustering Results:")
    print(result_keyword)
    
    # Save to file
    print("\n" + "="*80)
    print("\nSaving results to product_clusters_final.json...")
    with open('product_clusters_final.json', 'w', encoding='utf-8') as f:
        f.write(result_keyword)
    print("Results saved successfully!")
    
    # Print summary statistics
    print("\n" + "="*80)
    print("\nCLUSTER SUMMARY:")
    result_dict = json.loads(result_keyword)
    for cluster_key, cluster_data in sorted(result_dict['clusters'].items(), 
                                            key=lambda x: x[1]['review_count'], 
                                            reverse=True):
        print(f"{cluster_data['cluster_label']}: {cluster_data['review_count']} reviews")