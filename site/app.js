/* ============================================================
   MARBENIO — logique du site

   RÈGLE IMPORTANTE : 1 seul kit par commande.
   Le panier ne peut contenir qu'un seul ensemble, en 1 exemplaire.
   ============================================================ */

const CART_KEY = "marbenio_panier_v3";
const LIVRAISON_OFFERTE = true;   // livraison offerte sur toutes les commandes
const FRAIS_PORT = 0;

/* ---------- Utilitaires ---------- */
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
/* Prix au format français : 80 € / 79,99 € */
const euro = n => {
  const v = Math.round(Number(n) * 100) / 100;
  const s = Number.isInteger(v) ? String(v) : v.toFixed(2).replace(".", ",");
  return s + " " + DEVISE;
};
const findOutfit = id => OUTFITS.find(o => o.id === id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));

const ICONS = {
  bag:  '<svg viewBox="0 0 24 24"><path d="M6 7h12l1 13H5L6 7Z"/><path d="M9 7V6a3 3 0 0 1 6 0v1"/></svg>',
  menu: '<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close:'<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  check:'<svg viewBox="0 0 24 24"><path d="M4 12.5 9 17.5 20 6.5"/></svg>',
  info: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.6v.6"/></svg>',
  truck:'<svg viewBox="0 0 24 24"><path d="M3 7h11v10H3zM14 10h4l3 3v4h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17.5" cy="18" r="1.6"/></svg>',
  chat: '<svg viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.7 7.1L4 20.5l1.4-5.1A8 8 0 1 1 21 12Z"/></svg>',
  hang: '<svg viewBox="0 0 24 24"><path d="M12 8a2.2 2.2 0 1 1 2.2-2.2M12 8v2.5L4 16h16l-8-5.5"/></svg>',
};

/* ============================================================
   Panier — au maximum UN seul kit
   Format stocké : { id: "o07" }  ou  {} si vide
   ============================================================ */
function getCart(){
  try {
    const c = JSON.parse(localStorage.getItem(CART_KEY));
    if (c && c.id && findOutfit(c.id)) return c;
  } catch(e){}
  return {};
}
function saveCart(c){
  try { localStorage.setItem(CART_KEY, JSON.stringify(c)); } catch(e){}
  repaint();
}
function cartItem(){
  const c = getCart();
  return c.id ? findOutfit(c.id) : null;
}
function cartCount(){ return cartItem() ? 1 : 0; }
function cartTotal(){ const o = cartItem(); return o ? o.prix : 0; }

function addToCart(id){
  const o = findOutfit(id);
  if (!o || !o.stock) return;

  const actuel = cartItem();

  if (actuel && actuel.id === id){
    toast("Ce kit est déjà dans ton panier", "info");
    openCart();
    return;
  }
  if (actuel){
    saveCart({ id: id });
    toast(LIMITE_TITRE + " — « " + o.nom + " » remplace « " + actuel.nom + " »", "info");
    openCart();
    return;
  }
  saveCart({ id: id });
  toast(o.nom + " ajouté au panier");
  openCart();
}
function clearCart(){ saveCart({}); }

function repaint(){
  const n = cartCount();
  $$("[data-badge]").forEach(el => {
    el.textContent = n;
    el.classList.toggle("on", n > 0);
  });
  if ($("[data-drawer-body]")) renderDrawer();
  if ($("[data-cartpage]"))    renderCartPage();
  syncProductButton();
}

/* ---------- Toast ---------- */
let toastTimer;
function toast(msg, type){
  let t = $(".toast");
  if (!t){ t = document.createElement("div"); t.className = "toast"; document.body.appendChild(t); }
  t.innerHTML = (type === "info" ? ICONS.info : ICONS.check) + "<span>" + esc(msg) + "</span>";
  requestAnimationFrame(()=> t.classList.add("on"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove("on"), 3400);
}

/* ---------- Encadré « 1 kit par commande » ---------- */
function limiteBox(compact){
  return `
    <div class="limite ${compact ? "limite--sm" : ""}">
      ${ICONS.info}
      <div>
        <b>${esc(LIMITE_TITRE)}</b>
        <span>${esc(LIMITE_TEXTE)}</span>
      </div>
    </div>`;
}

/* ============================================================
   Chrome commun : header, menu mobile, tiroir panier, footer
   ============================================================ */
let closeAll = () => {};
let openCart = () => {};

function buildChrome(){
  document.body.insertAdjacentHTML("afterbegin", `
    <div class="announce">${esc(ANNONCE)}</div>
    <header class="header">
      <div class="header__in">
        <div class="header__left">
          <button class="icon-btn burger" data-menu-open aria-label="Ouvrir le menu">${ICONS.menu}</button>
        </div>
        <a class="brand" href="index.html">${esc(MARQUE)}</a>
        <nav class="nav">
          <a href="index.html">Boutique</a>
          <a href="index.html#looks">Tous les looks</a>
          <a href="index.html#concept">Le concept</a>
        </nav>
        <div class="header__right">
          <button class="icon-btn cart-btn" data-cart-open aria-label="Ouvrir le panier">
            ${ICONS.bag}<span class="badge" data-badge>0</span>
          </button>
        </div>
      </div>
    </header>

    <nav class="mobile-nav" data-mobile-nav>
      <button class="icon-btn mobile-nav__close" data-menu-close aria-label="Fermer">${ICONS.close}</button>
      <a href="index.html">Boutique</a>
      <a href="index.html#looks">Tous les looks</a>
      <a href="index.html#concept">Le concept</a>
      <a href="panier.html">Panier</a>
      <div class="mobile-nav__foot">${esc(LIMITE_TITRE)} — ${euro(PRIX_DEFAUT)} l'ensemble</div>
    </nav>
  `);

  document.body.insertAdjacentHTML("beforeend", `
    <div class="overlay" data-overlay></div>
    <aside class="drawer" data-drawer aria-label="Panier">
      <div class="drawer__head">
        <h2>Panier</h2>
        <button class="icon-btn" data-cart-close aria-label="Fermer">${ICONS.close}</button>
      </div>
      <div class="drawer__body" data-drawer-body></div>
      <div class="drawer__foot" data-drawer-foot></div>
    </aside>

    <footer class="footer">
      <div class="shell footer__grid">
        <div>
          <div class="footer__brand">${esc(MARQUE)}</div>
          <p>Des tenues complètes, pensées et coordonnées. Tu choisis le look, on t'envoie l'ensemble.</p>
        </div>
        <div>
          <h4>Boutique</h4>
          <ul>
            <li><a href="index.html#looks">Tous les looks</a></li>
            <li><a href="index.html#concept">Comment ça marche</a></li>
            <li><a href="panier.html">Mon panier</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="https://wa.me/${CONTACT.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a href="mailto:${CONTACT.email}">Email</a></li>
            <li><a href="${CONTACT.instagram}" target="_blank" rel="noopener">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div class="shell footer__bar">
        <span>© ${new Date().getFullYear()} ${esc(MARQUE)}</span>
        <span>${esc(LIMITE_TITRE)} · Livraison 3 à 7 jours</span>
      </div>
    </footer>
  `);

  const nav     = $("[data-mobile-nav]");
  const drawer  = $("[data-drawer]");
  const overlay = $("[data-overlay]");

  closeAll = () => {
    nav.classList.remove("open");
    drawer.classList.remove("on");
    overlay.classList.remove("on");
    document.body.classList.remove("is-locked");
  };
  openCart = () => {
    renderDrawer();
    drawer.classList.add("on");
    overlay.classList.add("on");
    document.body.classList.add("is-locked");
  };

  $("[data-menu-open]").onclick  = () => { nav.classList.add("open"); document.body.classList.add("is-locked"); };
  $("[data-menu-close]").onclick = closeAll;
  $("[data-cart-open]").onclick  = openCart;
  $("[data-cart-close]").onclick = closeAll;
  overlay.onclick = closeAll;
  $$("[data-mobile-nav] a").forEach(a => a.addEventListener("click", closeAll));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeAll(); });
}

/* ---------- Tiroir panier ---------- */
function renderDrawer(){
  const body = $("[data-drawer-body]");
  const foot = $("[data-drawer-foot]");
  if (!body) return;

  const o = cartItem();

  if (!o){
    body.innerHTML = `<p class="empty">Ton panier est vide.</p>${limiteBox(true)}`;
    foot.innerHTML = `<a class="btn btn--ghost btn--block" href="index.html#looks">Découvrir les looks</a>`;
    return;
  }

  body.innerHTML = `
    <div class="line">
      <a href="outfit.html?id=${o.id}"><img src="${o.image}" alt="${esc(o.nom)}"></a>
      <div class="line__main">
        <a href="outfit.html?id=${o.id}" class="line__name">${esc(o.nom)}</a>
        <div class="line__price">${euro(o.prix)} · ${(o.pieces||[]).length} pièces</div>
        <div class="line__row">
          <span class="tagline">1 exemplaire</span>
          <button class="line__rm" data-clear>Retirer</button>
        </div>
      </div>
    </div>
    ${limiteBox(true)}`;

  foot.innerHTML = `
    <div class="totals">
      <div class="totals__row"><span>Sous-total</span><span>${euro(o.prix)}</span></div>
      <div class="totals__row"><span>Livraison</span><span class="free-ship">Offerte</span></div>
      <div class="totals__row totals__row--big"><span>Total</span><span>${euro(o.prix + FRAIS_PORT)}</span></div>
    </div>
    <a class="btn btn--solid btn--block" href="panier.html">Finaliser la commande</a>`;

  const rm = $("[data-clear]", body);
  if (rm) rm.onclick = clearCart;
}

/* ============================================================
   Page boutique
   ============================================================ */
let filtreActif = "tous";

function renderHero(el){
  const vedette = OUTFITS[8] || OUTFITS[0];
  el.innerHTML = `
    <div class="shell hero__grid">
      <div>
        <div class="eyebrow">Tenues complètes · Séries limitées</div>
        <h1>Le look complet,<br><em>pas la pièce.</em></h1>
        <p>Haut, bas, sneakers et accessoires : chaque tenue est coordonnée de A à Z. Tu choisis le look, on t'envoie l'ensemble.</p>
        <div class="hero__cta">
          <a class="btn btn--solid" href="#looks">Voir les ${OUTFITS.length} looks</a>
          <a class="btn btn--ghost" href="#concept">Comment ça marche</a>
        </div>
        ${limiteBox(false)}
        <div class="hero__stats">
          <div><b>${OUTFITS.length}</b><span>Looks</span></div>
          <div><b>${euro(PRIX_DEFAUT)}</b><span>L'ensemble</span></div>
          <div><b>3–7 j</b><span>Livraison</span></div>
        </div>
      </div>
      <a class="hero__media" href="outfit.html?id=${vedette.id}">
        <img src="${vedette.image}" alt="${esc(vedette.nom)}" fetchpriority="high">
        <span class="hero__tag">${esc(vedette.nom)} — ${euro(vedette.prix)}</span>
      </a>
    </div>`;
}

function renderFilters(el){
  const counts = { tous: OUTFITS.length };
  OUTFITS.forEach(o => counts[o.tag] = (counts[o.tag] || 0) + 1);

  const cles = ["tous"].concat(Object.keys(FAMILLES).filter(k => counts[k]));
  el.innerHTML = cles.map(k => `
    <button class="chip" data-filtre="${k}" aria-pressed="${k === filtreActif}">
      ${k === "tous" ? "Tous les looks" : esc(FAMILLES[k])}<b>${counts[k]}</b>
    </button>`).join("");

  $$("[data-filtre]", el).forEach(b => b.onclick = () => {
    filtreActif = b.dataset.filtre;
    $$("[data-filtre]", el).forEach(x => x.setAttribute("aria-pressed", x.dataset.filtre === filtreActif));
    renderGrid($("[data-grid]"));
  });
}

function renderGrid(el){
  if (!el) return;
  const liste = filtreActif === "tous" ? OUTFITS : OUTFITS.filter(o => o.tag === filtreActif);

  if (!liste.length){
    el.innerHTML = `<p class="empty" style="grid-column:1/-1">Aucun look dans cette catégorie.</p>`;
    return;
  }

  el.innerHTML = liste.map((o, i) => `
    <article class="card reveal" style="transition-delay:${Math.min(i,7) * 45}ms">
      <div class="card__figure">
        <a class="card__media" href="outfit.html?id=${o.id}">
          <img src="${o.image}" alt="${esc(o.nom)}" loading="${i < 4 ? "eager" : "lazy"}" decoding="async">
          <span class="card__badge">${esc(FAMILLES[o.tag] || "Look")}</span>
          ${o.stock ? "" : '<span class="card__out">Épuisé</span>'}
        </a>
        ${o.stock ? `<div class="card__quick"><button class="btn" data-add="${o.id}">Ajouter — ${euro(o.prix)}</button></div>` : ""}
      </div>
      <div class="card__body">
        <div class="card__top">
          <a class="card__name" href="outfit.html?id=${o.id}">${esc(o.nom)}</a>
          <span class="card__price">${euro(o.prix)}</span>
        </div>
        <span class="card__count">${(o.pieces || []).length} pièces incluses · 1 par commande</span>
      </div>
    </article>`).join("");

  $$("[data-add]", el).forEach(b => b.addEventListener("click", e => {
    e.preventDefault(); e.stopPropagation();
    addToCart(b.dataset.add);
  }));

  observeReveal(el);
}

/* ============================================================
   Page produit
   ============================================================ */
let produitCourant = null;

function renderProduct(el){
  const id = new URLSearchParams(location.search).get("id");
  const o = findOutfit(id);

  if (!o){
    el.innerHTML = `<p class="empty" style="grid-column:1/-1">Ce look n'existe pas. <a href="index.html" style="text-decoration:underline">Retour à la boutique</a></p>`;
    return;
  }
  produitCourant = o;
  document.title = o.nom + " — " + MARQUE;

  el.innerHTML = `
    <div class="product__media">
      <img src="${o.image}" alt="${esc(o.nom)}" fetchpriority="high">
    </div>
    <div class="product__info">
      <div class="eyebrow product__tag">${esc(FAMILLES[o.tag] || "Look complet")} · Série limitée</div>
      <h1>${esc(o.nom)}</h1>
      <div class="product__price">${euro(o.prix)} <span>l'ensemble complet · ${(o.pieces||[]).length} pièces</span></div>
      <p class="product__desc">${esc(o.description)}</p>

      <div class="pieces__title"><span>Ce que tu reçois</span><span>${(o.pieces||[]).length} pièces</span></div>
      <ul class="pieces">${(o.pieces||[]).map(p => `<li>${esc(p)}</li>`).join("")}</ul>

      ${limiteBox(false)}

      <div class="product__actions">
        <button class="btn btn--solid btn--block" data-add="${o.id}" ${o.stock ? "" : "disabled"}>
          ${o.stock ? "Ajouter au panier — " + euro(o.prix) : "Épuisé"}
        </button>
        <a class="btn btn--ghost btn--block" href="index.html#looks">Voir les autres looks</a>
      </div>

      <div class="product__note">
        <div>${ICONS.hang}<span>Tenue complète coordonnée : haut, bas, chaussures et accessoires.</span></div>
        <div>${ICONS.truck}<span>Livraison offerte — 3 à 7 jours.</span></div>
        <div>${ICONS.chat}<span>Tailles à préciser à la commande (WhatsApp ou email).</span></div>
      </div>
    </div>`;

  const add = $("[data-add]", el);
  if (add) add.onclick = () => addToCart(o.id);

  if (o.stock){
    document.body.insertAdjacentHTML("beforeend", `
      <div class="buybar" data-buybar>
        <span class="buybar__price">${euro(o.prix)}</span>
        <button class="btn btn--solid" data-add-bar>Ajouter au panier</button>
      </div>`);
    $("[data-add-bar]").onclick = () => addToCart(o.id);

    const bar = $("[data-buybar]");
    if ("IntersectionObserver" in window && add){
      new IntersectionObserver(([e]) => {
        bar.classList.toggle("on", !e.isIntersecting && e.boundingClientRect.top < 0);
      }, { threshold: 0 }).observe(add);
    }
  }
  syncProductButton();
}

/* Met à jour le bouton si le kit est déjà dans le panier */
function syncProductButton(){
  if (!produitCourant) return;
  const dedans = cartItem() && cartItem().id === produitCourant.id;
  const label  = dedans ? "Déjà dans ton panier" : "Ajouter au panier — " + euro(produitCourant.prix);
  const main = $("[data-add]");
  if (main && produitCourant.stock) main.textContent = label;
  const bar = $("[data-add-bar]");
  if (bar) bar.textContent = dedans ? "Déjà dans ton panier" : "Ajouter au panier";
}

/* ============================================================
   Page panier
   ============================================================ */
function renderCartPage(){
  const el = $("[data-cartpage]");
  if (!el) return;

  const o = cartItem();

  if (!o){
    el.innerHTML = `
      <h1>Panier</h1>
      <p class="cartpage__sub">Ton panier est vide pour le moment.</p>
      ${limiteBox(false)}
      <a class="btn btn--solid" href="index.html#looks" style="margin-top:20px">Découvrir les looks</a>`;
    return;
  }

  const total = o.prix + FRAIS_PORT;
  const msg  = buildOrderMessage(o, total);
  const wa   = "https://wa.me/" + CONTACT.whatsapp + "?text=" + encodeURIComponent(msg);
  const mail = "mailto:" + CONTACT.email + "?subject=" + encodeURIComponent("Commande " + MARQUE + " — " + o.nom) + "&body=" + encodeURIComponent(msg);
  const paiement = CONTACT.paiement || "";

  el.innerHTML = `
    <h1>Panier</h1>
    <p class="cartpage__sub">Un ensemble complet — ${(o.pieces||[]).length} pièces.</p>

    <div class="line">
      <a href="outfit.html?id=${o.id}"><img src="${o.image}" alt="${esc(o.nom)}"></a>
      <div class="line__main">
        <a href="outfit.html?id=${o.id}" class="line__name">${esc(o.nom)}</a>
        <div class="line__price">${esc(FAMILLES[o.tag] || "Look complet")} · ${(o.pieces||[]).length} pièces</div>
        <div class="line__row">
          <strong style="font-size:15px">${euro(o.prix)}</strong>
          <button class="line__rm" data-clear>Retirer</button>
        </div>
      </div>
    </div>

    ${limiteBox(false)}

    <div class="cartpage__foot">
      <div class="howto">
        <h4 class="eyebrow" style="margin-bottom:10px">Comment finaliser</h4>
        <b>1.</b> Clique sur « Payer en ligne » pour régler le montant.<br>
        <b>2.</b> Remplis tes infos : nom, adresse et tailles.<br>
        <b>3.</b> On expédie sous 24 h, livraison offerte en 3 à 7 jours.<br><br>
        <span style="color:var(--muted)">Envie d'un deuxième look ? Repasse une commande une fois celle-ci confirmée.</span>
      </div>
      <div class="summary">
        <h3>Récapitulatif</h3>
        <div class="totals">
          <div class="totals__row"><span>${esc(o.nom)}</span><span>${euro(o.prix)}</span></div>
          <div class="totals__row"><span>Livraison</span><span class="free-ship">Offerte</span></div>
          <div class="totals__row totals__row--big"><span>Total</span><span>${euro(total)}</span></div>
        </div>
        ${paiement ? `<a class="btn btn--solid btn--block" href="${esc(paiement)}" target="_blank" rel="noopener">Payer en ligne — ${euro(total)}</a>` : ""}
        <a href="index.html#looks" style="text-align:center;font-size:12px;color:var(--muted);text-decoration:underline;text-underline-offset:3px">Continuer mes achats</a>
      </div>
    </div>`;

  const rm = $("[data-clear]", el);
  if (rm) rm.onclick = clearCart;
}

function buildOrderMessage(o, total){
  return [
    "Bonjour, je souhaite commander sur " + MARQUE + " :",
    "",
    "• " + o.nom + " — " + euro(o.prix),
    "  (" + (o.pieces||[]).join(", ") + ")",
    "",
    "Livraison : offerte",
    "TOTAL : " + euro(total),
    "",
    "Nom :",
    "Adresse de livraison :",
    "Taille haut :",
    "Taille bas :",
    "Pointure :"
  ].join("\n");
}

/* ---------- Apparition au scroll ---------- */
function observeReveal(root){
  const els = $$(".reveal", root || document);
  if (!("IntersectionObserver" in window)){
    els.forEach(e => e.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting){ e.target.classList.add("in"); obs.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  els.forEach(e => io.observe(e));
}

/* ---------- Démarrage ---------- */
document.addEventListener("DOMContentLoaded", () => {
  buildChrome();

  const hero = $("[data-hero]");     if (hero) renderHero(hero);
  const filt = $("[data-filters]");  if (filt) renderFilters(filt);
  const grid = $("[data-grid]");     if (grid) renderGrid(grid);
  const prod = $("[data-product]");  if (prod) renderProduct(prod);

  repaint();
  observeReveal(document);
});
