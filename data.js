/* ============================================================
   CATALOGUE — un objet = un outfit complet

   Tu peux tout modifier ici :
   - "nom"         : titre affiché sur la boutique
   - "description" : petit texte sous la photo
   - "pieces"      : liste des pièces incluses (les puces)
   - "prix"        : prix en euros (80 par défaut)
   - "stock"       : true = disponible / false = épuisé
   - "tag"         : famille du look (sert aux filtres)
                     "total-look" | "veste" | "maille" | "essentiel"

   Pour retirer un outfit : supprime son bloc entre { }.
   Pour changer l'ordre : déplace les blocs.
   ============================================================ */

const PRIX_DEFAUT = 79.99;
const DEVISE = "€";

/* Nom de marque affiché partout sur le site */
const MARQUE = "MARBENIO";

/* Bandeau tout en haut du site */
const ANNONCE = "Livraison GRATUITE en 7 jours · Retour sous 14 jours garanti · 1 kit par commande";

/* Les 3 garanties mises en avant sur le site (bandeau sous le hero + fiche produit) */
const GARANTIES = [
  { icone: "truck",  titre: "Livraison gratuite",      texte: "Offerte sur toutes les commandes, sans minimum." },
  { icone: "clock",  titre: "Livrée en 7 jours",       texte: "Expédition sous 24 h, chez toi en 7 jours max." },
  { icone: "retour", titre: "Retour sous 14 jours",    texte: "Garanti. Ça ne te va pas ? Tu renvoies, on rembourse." },
];

/* Règle affichée partout : un seul ensemble par commande */
const LIMITE_TITRE = "1 kit par commande";
const LIMITE_TEXTE = "Chaque look est produit en très petite quantité. Pour qu'il y en ait pour tout le monde, tu ne peux commander qu'un seul ensemble à la fois.";

/* Coordonnées de commande */
const CONTACT = {
  // Numéro WhatsApp au format international SANS le "+" ni espaces.
  // Exemple France : 33612345678
  whatsapp: "33600000000",
  // Email de réception des commandes
  email: "milan.royobtp@gmail.com",
  instagram: "https://instagram.com/",
  // Lien de paiement en ligne (redirige le client vers la page de paiement)
  paiement: "https://t.trklinkx.com/click?pid=4784&offer_id=12541&sub3=TG",
};

/* Libellés des filtres de la boutique */
const FAMILLES = {
  "total-look": "Total look",
  "veste": "Vestes & coupe-vent",
  "maille": "Maille & sweats",
  "essentiel": "Essentiels",
};

const OUTFITS = [
  {
    id: "o01",
    nom: "Total Look Bordeaux Running",
    tag: "total-look",
    description: "Veste coupe-vent bordeaux, tee blanc, pantalon technique noir, sneakers assorties et casquette monogramme.",
    pieces: ["Veste coupe-vent bordeaux", "Tee-shirt blanc", "Pantalon technique noir", "Sneakers bordeaux", "Casquette monogramme"],
    image: "images/snaptik-app-7677587250481237281-slide-4.jpg",
  },
  {
    id: "o02",
    nom: "Coupe-vent Cœur & Sneakers Rouge",
    tag: "veste",
    description: "Coupe-vent à capuche imprimé cœur, tee blanc, jogging gris et sneakers rétro rouge / gris.",
    pieces: ["Coupe-vent capuche imprimé", "Tee-shirt blanc", "Jogging gris", "Sneakers rouge & gris", "Montre acier"],
    image: "images/snaptik-app-7677587250481237281-slide-5.jpg",
  },
  {
    id: "o03",
    nom: "Total Look Gris Perle",
    tag: "total-look",
    description: "Sweat col rond gris, jogging assorti, sacoche bandoulière noire et sneakers argent.",
    pieces: ["Sweat col rond gris", "Jogging gris assorti", "Sacoche bandoulière noire", "Sneakers argent", "Montre blanche"],
    image: "images/snaptik-app-7677587250481237281-slide-6.jpg",
  },
  {
    id: "o04",
    nom: "Set Noir Minimaliste",
    tag: "total-look",
    description: "Veste zippée manches courtes bicolore, chino noir, mocassins daim et casquette noire.",
    pieces: ["Veste zippée manches courtes", "Tee-shirt noir", "Chino noir", "Mocassins daim noir", "Casquette noire"],
    image: "images/snaptik-app-7677587250481237281-slide-7.jpg",
  },
  {
    id: "o05",
    nom: "Total Black Édition",
    tag: "total-look",
    description: "Tee noir, coupe-vent noir à capuche, jean slim noir, sacoche et sneakers running noires.",
    pieces: ["Coupe-vent noir capuche", "Tee-shirt noir", "Jean slim noir", "Sacoche bandoulière", "Sneakers running noires", "Montre acier"],
    image: "images/snaptik-app-7679093443355888928-slide-1.jpg",
  },
  {
    id: "o06",
    nom: "Coupe-vent Visage — Écru",
    tag: "veste",
    description: "Coupe-vent écru à imprimé visage, tee blanc, jean gris délavé, sneakers blanches et casquette blanche.",
    pieces: ["Coupe-vent écru imprimé", "Tee-shirt blanc", "Jean gris délavé", "Sneakers blanches", "Casquette blanche", "Montre or"],
    image: "images/snaptik-app-7679093443355888928-slide-2.jpg",
  },
  {
    id: "o07",
    nom: "Coupe-vent Visage — Bleu",
    tag: "veste",
    description: "Coupe-vent bleu à imprimé visage, tee noir, pantalon noir, sacoche et sneakers bicolores.",
    pieces: ["Coupe-vent bleu imprimé", "Tee-shirt noir", "Pantalon noir", "Sacoche noire", "Sneakers noir & blanc", "Lunettes"],
    image: "images/snaptik-app-7679093443355888928-slide-3.jpg",
  },
  {
    id: "o08",
    nom: "Total Look Kaki",
    tag: "total-look",
    description: "Veste zippée kaki, tee blanc, jogging kaki assorti, sandales daim et casquette monogramme blanche.",
    pieces: ["Veste kaki", "Tee-shirt blanc", "Jogging kaki assorti", "Sandales daim kaki", "Casquette blanche", "Montre or"],
    image: "images/snaptik-app-7679093443355888928-slide-4.jpg",
  },
  {
    id: "o09",
    nom: "Élégance Chocolat",
    tag: "veste",
    description: "Veste Harrington marron, tee blanc, chino marron, mocassins beige, sacoche cuir et montre or.",
    pieces: ["Veste Harrington marron", "Tee-shirt blanc", "Chino marron", "Mocassins daim beige", "Sacoche cuir marron", "Casquette marron"],
    image: "images/snaptik-app-7679093443355888928-slide-5.jpg",
  },
  {
    id: "o10",
    nom: "Blanc & Noir — Running",
    tag: "essentiel",
    description: "Tee blanc premium, pantalon noir, sacoche noire portée croisée et sneakers running blanches.",
    pieces: ["Tee-shirt blanc", "Pantalon noir", "Sacoche noire", "Sneakers running blanches", "Casquette noire", "Montre connectée"],
    image: "images/snaptik-app-7679093443355888928-slide-6.jpg",
  },
  {
    id: "o11",
    nom: "Maille Écru & Denim",
    tag: "maille",
    description: "Pull maille écru texturé, jean brut, sacoche cuir camel portée croisée et sneakers blanches.",
    pieces: ["Pull maille écru", "Jean brut", "Sacoche cuir camel", "Sneakers blanches", "Casquette écru", "Montre or"],
    image: "images/snaptik-app-7679093443355888928-slide-7.jpg",
  },
  {
    id: "o12",
    nom: "Blanc Épuré",
    tag: "essentiel",
    description: "Tee blanc coupe droite, chino noir, sacoche noire et sneakers running blanc / noir.",
    pieces: ["Tee-shirt blanc", "Chino noir", "Sacoche noire", "Sneakers blanc & noir", "Casquette noire", "Montre connectée"],
    image: "images/snaptik-app-7679832973461507361-slide-1.jpg",
  },
  {
    id: "o13",
    nom: "Veste Chore Camel",
    tag: "veste",
    description: "Veste chore camel à patch, tee blanc, jean bleu moyen, sneakers blanches et lunettes teintées.",
    pieces: ["Veste chore camel", "Tee-shirt blanc", "Jean bleu", "Sneakers blanches", "Lunettes teintées", "Montre or"],
    image: "images/snaptik-app-7679832973461507361-slide-4.jpg",
  },
  {
    id: "o14",
    nom: "Sweat Fleuri Blanc",
    tag: "maille",
    description: "Sweat blanc à logo fleuri, jean bleu clair, sacoche noire et sneakers dad blanches.",
    pieces: ["Sweat blanc imprimé", "Jean bleu clair", "Sacoche noire", "Sneakers dad blanches", "Casquette monogramme", "Montre acier"],
    image: "images/snaptik-app-7679832973461507361-slide-5.jpg",
  },
  {
    id: "o15",
    nom: "Total Look Kaki — Sport",
    tag: "total-look",
    description: "Veste technique kaki, tee noir, jogging kaki assorti, sneakers noires et casquette kaki.",
    pieces: ["Veste technique kaki", "Tee-shirt noir", "Jogging kaki assorti", "Sneakers noires", "Casquette kaki", "Montre digitale"],
    image: "images/snaptik-app-7679832973461507361-slide-6.jpg",
  },
  {
    id: "o16",
    nom: "Maille Bleu Roi",
    tag: "maille",
    description: "Pull maille bleu roi à motifs, jean gris, sacoche blanche et sneakers bleu / blanc.",
    pieces: ["Pull maille bleu roi", "Jean gris", "Sacoche blanche", "Sneakers bleu & blanc", "Lunettes"],
    image: "images/snaptik-app-7679832973461507361-slide-7.jpg",
  },
  {
    id: "o17",
    nom: "Coupe-vent Réversible Écru / Marine",
    tag: "veste",
    description: "Coupe-vent à capuche imprimé visage doublé marine, chino noir, sneakers bicolores et casquette marine.",
    pieces: ["Coupe-vent écru / marine", "Tee marine", "Chino noir", "Sneakers noir & blanc", "Casquette marine", "Montre bleue"],
    image: "images/snaptik-app-7680226463651597600-slide-1.jpg",
  },
  {
    id: "o18",
    nom: "Maille Noire — Total Black",
    tag: "maille",
    description: "Pull maille noir logo, tee blanc, jean noir, sacoche blanche et sneakers noir / blanc.",
    pieces: ["Pull maille noir", "Tee-shirt blanc", "Jean noir", "Sacoche blanche", "Sneakers noir & blanc", "Montre acier"],
    image: "images/snaptik-app-7680226463651597600-slide-2.jpg",
  },
  {
    id: "o19",
    nom: "Doudoune Sans Manches Marine",
    tag: "veste",
    description: "Doudoune sans manches marine monogramme, tee manches longues blanc, jean noir délavé, sacoche selle et sneakers noires.",
    pieces: ["Doudoune sans manches marine", "Tee manches longues blanc", "Jean noir délavé", "Sacoche selle noire", "Sneakers noires", "Montre acier"],
    image: "images/snaptik-app-7680226463651597600-slide-3.jpg",
  },
  {
    id: "o20",
    nom: "Bleu Ciel & Denim Noir",
    tag: "essentiel",
    description: "Tee bleu ciel logo cœur, jean noir déchiré, sacoche selle noire et sneakers bleu ciel.",
    pieces: ["Tee-shirt bleu ciel", "Jean noir déchiré", "Sacoche selle noire", "Sneakers bleu ciel", "Lunettes", "Montre acier"],
    image: "images/snaptik-app-7680226463651597600-slide-4.jpg",
  },
  {
    id: "o21",
    nom: "Coupe-vent Orange",
    tag: "veste",
    description: "Coupe-vent orange à capuche imprimé visage, tee blanc, jean gris, sacoche noire et sneakers blanches.",
    pieces: ["Coupe-vent orange", "Tee-shirt blanc", "Jean gris", "Sacoche noire", "Sneakers blanches", "Casquette monogramme"],
    image: "images/snaptik-app-7680226463651597600-slide-5.jpg",
  },
  {
    id: "o22",
    nom: "Gilet Technique & Blanc",
    tag: "essentiel",
    description: "Gilet technique noir, tee blanc logo, jean blanc déchiré et sneakers blanches.",
    pieces: ["Gilet technique noir", "Tee-shirt blanc", "Jean blanc déchiré", "Sneakers blanches", "Montre blanche"],
    image: "images/snaptik-app-7680226463651597600-slide-6.jpg",
  },
  {
    id: "o23",
    nom: "Veste Daim Noire",
    tag: "veste",
    description: "Veste type trucker en daim noir, tee blanc, jean bleu moyen et sneakers dad blanches.",
    pieces: ["Veste daim noire", "Tee-shirt blanc", "Jean bleu", "Sneakers dad blanches", "Lunettes", "Montre acier"],
    image: "images/snaptik-app-7680226463651597600-slide-7.jpg",
  },
  {
    id: "o24",
    nom: "Total Black — Hoodie Set",
    tag: "total-look",
    description: "Ensemble hoodie + jogging noir à logo, sacoche noire, sneakers running noires et casquette noire.",
    pieces: ["Hoodie noir logo", "Jogging noir assorti", "Sacoche noire", "Sneakers running noires", "Casquette noire", "Montre noire"],
    image: "images/snaptik-app-7672385591849258273-slide-1.jpg",
  },
  {
    id: "o25",
    nom: "Sweat Colorblock Écru",
    tag: "maille",
    description: "Sweat col rond écru à bande contrastée, jean noir, sneakers roses et casquette monogramme rose.",
    pieces: ["Sweat colorblock écru", "Jean noir", "Sneakers roses", "Casquette monogramme rose", "Montre blanche"],
    image: "images/snaptik-app-7672385591849258273-slide-2.jpg",
  },

  /* ---- Looks 26 à 54 : titres et descriptions à personnaliser ---- */
  { id: "o26", tag: "essentiel", nom: "Signature — Look 26", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7672385591849258273-slide-3.jpg" },
  { id: "o27", tag: "essentiel", nom: "Signature — Look 27", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7672385591849258273-slide-4.jpg" },
  { id: "o28", tag: "essentiel", nom: "Signature — Look 28", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7672385591849258273-slide-5.jpg" },
  { id: "o29", tag: "essentiel", nom: "Signature — Look 29", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7672385591849258273-slide-6.jpg" },
  { id: "o30", tag: "essentiel", nom: "Signature — Look 30", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7672385591849258273-slide-7.jpg" },
  { id: "o31", tag: "essentiel", nom: "Signature — Look 31", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7673495647282122017-slide-1.jpg" },
  { id: "o32", tag: "essentiel", nom: "Signature — Look 32", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7673495647282122017-slide-2.jpg" },
  { id: "o33", tag: "essentiel", nom: "Signature — Look 33", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7673495647282122017-slide-3.jpg" },
  { id: "o34", tag: "essentiel", nom: "Signature — Look 34", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7673495647282122017-slide-4.jpg" },
  { id: "o35", tag: "essentiel", nom: "Signature — Look 35", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7673495647282122017-slide-5.jpg" },
  { id: "o36", tag: "essentiel", nom: "Signature — Look 36", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7673495647282122017-slide-6.jpg" },
  { id: "o37", tag: "essentiel", nom: "Signature — Look 37", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7673495647282122017-slide-7.jpg" },
  { id: "o38", tag: "essentiel", nom: "Signature — Look 38", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7674634793023294752-slide-1.jpg" },
  { id: "o39", tag: "essentiel", nom: "Signature — Look 39", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7674634793023294752-slide-2.jpg" },
  { id: "o40", tag: "essentiel", nom: "Signature — Look 40", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7674634793023294752-slide-3.jpg" },
  { id: "o41", tag: "essentiel", nom: "Signature — Look 41", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7674634793023294752-slide-4.jpg" },
  { id: "o42", tag: "essentiel", nom: "Signature — Look 42", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7674634793023294752-slide-5.jpg" },
  { id: "o43", tag: "essentiel", nom: "Signature — Look 43", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7674634793023294752-slide-6.jpg" },
  { id: "o44", tag: "essentiel", nom: "Signature — Look 44", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7674634793023294752-slide-7.jpg" },
  { id: "o45", tag: "essentiel", nom: "Signature — Look 45", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7675742521489935648-slide-1.jpg" },
  { id: "o46", tag: "essentiel", nom: "Signature — Look 46", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7675742521489935648-slide-2.jpg" },
  { id: "o47", tag: "essentiel", nom: "Signature — Look 47", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7675742521489935648-slide-3.jpg" },
  { id: "o48", tag: "essentiel", nom: "Signature — Look 48", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7675742521489935648-slide-4.jpg" },
  { id: "o49", tag: "essentiel", nom: "Signature — Look 49", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7675742521489935648-slide-5.jpg" },
  { id: "o50", tag: "essentiel", nom: "Signature — Look 50", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7675742521489935648-slide-6.jpg" },
  { id: "o51", tag: "essentiel", nom: "Signature — Look 51", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7675742521489935648-slide-7.jpg" },
  { id: "o52", tag: "essentiel", nom: "Signature — Look 52", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7677587250481237281-slide-1.jpg" },
  { id: "o53", tag: "essentiel", nom: "Signature — Look 53", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7677587250481237281-slide-2.jpg" },
  { id: "o54", tag: "essentiel", nom: "Signature — Look 54", description: "Outfit complet coordonné : pièce forte, bas assorti, sneakers et accessoires.", pieces: ["Pièce forte", "Bas assorti", "Sneakers", "Accessoire"], image: "images/snaptik-app-7677587250481237281-slide-3.jpg" },
];

OUTFITS.forEach(function (o) {
  if (o.prix == null) o.prix = PRIX_DEFAUT;
  if (o.stock == null) o.stock = true;
  if (o.tag == null) o.tag = "essentiel";
});
