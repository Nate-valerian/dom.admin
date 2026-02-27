import { useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────
const BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

// ─────────────────────────────────────────────────────────────
// TRANSLATIONS (EN / RU)
// ─────────────────────────────────────────────────────────────
const T = {
  en: {
    appName: "DOM Admin",
    subtitle: "Control Panel",
    dashboard: "Dashboard",
    users: "Users",
    marketplace: "Marketplace",
    events: "Events",
    groups: "Groups",
    memory: "User Memory",
    signIn: "Sign In",
    email: "Email",
    password: "Password",
    totalUsers: "Total Users",
    activeUsers: "Active Users",
    products: "Products",
    eventsLabel: "Events",
    quickActions: "Quick Actions",
    systemStatus: "System Status",
    online: "Online",
    offline: "Offline",
    newUser: "New User",
    searchNameEmail: "Search by name or email…",
    role: "Role",
    status: "Status",
    joined: "Joined",
    lastActive: "Last Active",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    create: "Create",
    save: "Save",
    cancel: "Cancel",
    saving: "Saving…",
    displayName: "Display Name",
    guest: "Guest",
    staff: "Staff",
    admin: "Admin",
    active: "Active",
    disabled: "Disabled",
    createUser: "Create User",
    editUser: "Edit User",
    addProduct: "Add Product",
    editProduct: "Edit Product",
    searchProducts: "Search products…",
    all: "All",
    product: "Product",
    category: "Category",
    price: "Price",
    visible: "Visible",
    updated: "Updated",
    image: "Image",
    titleEn: "Title (English)",
    titleRu: "Title (Russian)",
    descriptionEn: "Description (EN)",
    descriptionRu: "Description (RU)",
    priceLabel: "Price (RUB)",
    categoryLabel: "Category",
    visibility: "Visibility",
    visibleToUsers: "Visible to users",
    hiddenFromUsers: "Hidden from users",
    newEvent: "New Event",
    event: "Event",
    type: "Type",
    start: "Start",
    end: "End",
    capacity: "Capacity",
    spotsLeft: "Spots Left",
    left: "left",
    full: "Full",
    startTime: "Start Time",
    endTime: "End Time",
    eventType: "Type / Kind",
    createEvent: "Create Event",
    editEvent: "Edit Event",
    createGroup: "Create Group",
    groupName: "Group Name",
    description: "Description",
    members: "Members",
    manageMembers: "Manage Members",
    addMember: "Add Member",
    userUuid: "User UUID",
    close: "Close",
    userId: "User ID (UUID)",
    searchQuery: "Search Query",
    searchMemory: "Search Memory",
    searching: "Searching…",
    content: "Content",
    score: "Score",
    noUsersFound: "No users found.",
    noProductsFound: "No products found.",
    noEventsScheduled: "No events scheduled.",
    noGroupsFound: "No groups found.",
    noMemoryEntries: "No memory entries found.",
    loginFailed: "Login failed",
    required: "is required.",
    titleRequired: "Title (EN), Title (RU) and Price",
    eventTitleRequired: "Title (EN/RU), start and end times",
    groupTitleRequired: "Title",
    uploadImage: "Upload Image",
    orUrl: "Or paste image URL below",
    max5mb: "Max 5MB · JPG, PNG, WebP",
    apiServer: "API Server",
    llmProvider: "LLM Provider",
    tts: "TTS (Silero)",
    stt: "Yandex STT",
    administrator: "Administrator",
    signOut: "Sign out",
    welcome: "Welcome to DOM Admin. Here's what's happening.",
    createNewUser: "Create new user",
    addProductAction: "Add product",
    scheduleEvent: "Schedule event",
    createGroupAction: "Create group",
    manageAccounts: "Manage accounts, roles and access",
    productsActive: "products · active",
    upcomingEvents: "upcoming events",
    manageGroups: "Manage group conversations and membership",
    searchManageMemory: "Search and manage semantic memory for users",
    confirmDelete: "Delete",
    memberAdded: "Member added successfully.",
    toRemoveMember: "To remove a member, use:",
    general: "General",
    tea: "Tea",
    honey: "Honey",
    sets: "Sets",
    accessories: "Accessories",
  },
  ru: {
    appName: "DOM Админ",
    subtitle: "Панель управления",
    dashboard: "Панель",
    users: "Пользователи",
    marketplace: "Маркетплейс",
    events: "События",
    groups: "Группы",
    memory: "Память",
    signIn: "Войти",
    email: "Email",
    password: "Пароль",
    totalUsers: "Всего пользователей",
    activeUsers: "Активные",
    products: "Товары",
    eventsLabel: "События",
    quickActions: "Быстрые действия",
    systemStatus: "Статус системы",
    online: "Онлайн",
    offline: "Офлайн",
    newUser: "Новый пользователь",
    searchNameEmail: "Поиск по имени или email…",
    role: "Роль",
    status: "Статус",
    joined: "Присоединился",
    lastActive: "Последняя активность",
    actions: "Действия",
    edit: "Изменить",
    delete: "Удалить",
    create: "Создать",
    save: "Сохранить",
    cancel: "Отмена",
    saving: "Сохранение…",
    displayName: "Отображаемое имя",
    guest: "Гость",
    staff: "Сотрудник",
    admin: "Админ",
    active: "Активен",
    disabled: "Отключен",
    createUser: "Создать пользователя",
    editUser: "Редактировать пользователя",
    addProduct: "Добавить товар",
    editProduct: "Редактировать товар",
    searchProducts: "Поиск товаров…",
    all: "Все",
    product: "Товар",
    category: "Категория",
    price: "Цена",
    visible: "Видимо",
    updated: "Обновлено",
    image: "Изображение",
    titleEn: "Название (English)",
    titleRu: "Название (Русский)",
    descriptionEn: "Описание (EN)",
    descriptionRu: "Описание (RU)",
    priceLabel: "Цена (RUB)",
    categoryLabel: "Категория",
    visibility: "Видимость",
    visibleToUsers: "Видимо пользователям",
    hiddenFromUsers: "Скрыто от пользователей",
    newEvent: "Новое событие",
    event: "Событие",
    type: "Тип",
    start: "Начало",
    end: "Конец",
    capacity: "Вместимость",
    spotsLeft: "Мест осталось",
    left: "ост.",
    full: "Заполнено",
    startTime: "Время начала",
    endTime: "Время окончания",
    eventType: "Тип / Вид",
    createEvent: "Создать событие",
    editEvent: "Редактировать событие",
    createGroup: "Создать группу",
    groupName: "Название группы",
    description: "Описание",
    members: "Участники",
    manageMembers: "Управление участниками",
    addMember: "Добавить участника",
    userUuid: "UUID пользователя",
    close: "Закрыть",
    userId: "ID пользователя (UUID)",
    searchQuery: "Поисковый запрос",
    searchMemory: "Поиск памяти",
    searching: "Поиск…",
    content: "Содержимое",
    score: "Релевантность",
    noUsersFound: "Пользователи не найдены.",
    noProductsFound: "Товары не найдены.",
    noEventsScheduled: "События не запланированы.",
    noGroupsFound: "Группы не найдены.",
    noMemoryEntries: "Записи памяти не найдены.",
    loginFailed: "Ошибка входа",
    required: "обязательно.",
    titleRequired: "Название (EN), Название (RU) и Цена",
    eventTitleRequired: "Название (EN/RU), время начала и окончания",
    groupTitleRequired: "Название",
    uploadImage: "Загрузить изображение",
    orUrl: "Или вставьте URL изображения ниже",
    max5mb: "Макс 5МБ · JPG, PNG, WebP",
    apiServer: "API Сервер",
    llmProvider: "LLM Провайдер",
    tts: "TTS (Silero)",
    stt: "Yandex STT",
    administrator: "Администратор",
    signOut: "Выйти",
    welcome: "Добро пожаловать в DOM Admin. Вот что происходит.",
    createNewUser: "Создать нового пользователя",
    addProductAction: "Добавить товар",
    scheduleEvent: "Запланировать событие",
    createGroupAction: "Создать группу",
    manageAccounts: "Управление аккаунтами, ролями и доступом",
    productsActive: "товаров · активно",
    upcomingEvents: "предстоящих событий",
    manageGroups: "Управление групповыми беседами и участниками",
    searchManageMemory: "Поиск и управление семантической памятью пользователей",
    confirmDelete: "Удалить",
    memberAdded: "Участник успешно добавлен.",
    toRemoveMember: "Чтобы удалить участника, используйте:",
    general: "Общее",
    tea: "Чай",
    honey: "Мёд",
    sets: "Наборы",
    accessories: "Аксессуары",
  },
};

// ─────────────────────────────────────────────────────────────
// API HELPER
// ─────────────────────────────────────────────────────────────
async function api(path, opts = {}, token = null) {
  const headers = { "Content-Type": "application/json", ...(opts.headers || {}) };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const res = await fetch(`${BASE}${path}`, { ...opts, headers });
  if (res.status === 204) return null;
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || res.statusText);
  }
  return res.json();
}

// ─────────────────────────────────────────────────────────────
// STYLES
// ─────────────────────────────────────────────────────────────
const G = {
  bg: "#F5F0E8",
  sidebar: "#1C1410",
  sideHover: "#2A1F18",
  sideActive: "#3D2B1F",
  card: "#FFFFFF",
  border: "rgba(20,16,10,0.09)",
  ink: "#14100A",
  muted: "rgba(20,16,10,0.45)",
  accent: "#BF7F5A",
  accentSoft: "rgba(191,127,90,0.12)",
  accentBrd: "rgba(191,127,90,0.3)",
  danger: "#C0392B",
  dangerSoft: "rgba(192,57,43,0.09)",
  success: "#2E7D32",
  successSoft: "rgba(46,125,50,0.09)",
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'DM Sans',sans-serif;background:${G.bg};color:${G.ink}}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:${G.border};border-radius:999px}
.admin-shell{display:flex;height:100vh;overflow:hidden}
.sidebar{width:240px;min-width:240px;background:${G.sidebar};display:flex;flex-direction:column;padding:0;overflow:hidden}
.sidebar-logo{padding:28px 24px 20px;border-bottom:1px solid rgba(255,255,255,0.06)}
.sidebar-logo-kicker{font-size:9px;font-weight:700;letter-spacing:3px;color:rgba(255,255,255,0.3);text-transform:uppercase}
.sidebar-logo-name{font-family:'Playfair Display',serif;font-size:22px;font-weight:900;color:#fff;margin-top:4px}
.sidebar-logo-sub{font-size:11px;color:rgba(255,255,255,0.3);margin-top:2px}
.sidebar-nav{flex:1;padding:16px 12px;overflow-y:auto;display:flex;flex-direction:column;gap:2px}
.nav-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;cursor:pointer;transition:background 0.15s;color:rgba(255,255,255,0.55);font-size:13.5px;font-weight:500;border:none;background:none;width:100%;text-align:left}
.nav-item:hover{background:${G.sideHover};color:rgba(255,255,255,0.85)}
.nav-item.active{background:${G.sideActive};color:#fff}
.nav-item.active .nav-icon{color:${G.accent}}
.nav-icon{font-size:16px;width:20px;text-align:center;flex-shrink:0}
.sidebar-footer{padding:16px 12px;border-top:1px solid rgba(255,255,255,0.06)}
.sidebar-user{display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:10px}
.sidebar-avatar{width:32px;height:32px;border-radius:999px;background:${G.accent};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;flex-shrink:0}
.sidebar-user-info{flex:1;overflow:hidden}
.sidebar-user-name{font-size:12px;font-weight:600;color:rgba(255,255,255,0.85);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sidebar-user-role{font-size:10px;color:rgba(255,255,255,0.3)}
.logout-btn{padding:6px;border-radius:8px;border:none;background:none;color:rgba(255,255,255,0.3);cursor:pointer;font-size:16px;transition:color 0.15s}
.logout-btn:hover{color:${G.danger}}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}
.topbar{padding:0 28px;height:60px;display:flex;align-items:center;justify-content:space-between;background:${G.card};border-bottom:1px solid ${G.border};flex-shrink:0}
.topbar-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:700;color:${G.ink}}
.topbar-actions{display:flex;align-items:center;gap:10px}
.content{flex:1;overflow-y:auto;padding:28px}
.card{background:${G.card};border-radius:16px;border:1px solid ${G.border};padding:20px;box-shadow:0 2px 12px rgba(20,16,10,0.06)}
.card-title{font-size:13px;font-weight:700;color:${G.muted};text-transform:uppercase;letter-spacing:1.5px}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:24px}
.stat-card{background:${G.card};border-radius:16px;border:1px solid ${G.border};padding:20px;box-shadow:0 2px 12px rgba(20,16,10,0.06)}
.stat-icon{width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:18px;margin-bottom:14px}
.stat-num{font-family:'Playfair Display',serif;font-size:32px;font-weight:900;color:${G.ink};line-height:1}
.stat-label{font-size:12px;color:${G.muted};margin-top:4px;font-weight:500}
.table-wrap{overflow-x:auto}
table{width:100%;border-collapse:collapse}
th{font-size:11px;font-weight:700;letter-spacing:1px;color:${G.muted};text-transform:uppercase;text-align:left;padding:10px 14px;border-bottom:1px solid ${G.border};background:rgba(20,16,10,0.02)}
td{padding:12px 14px;border-bottom:1px solid ${G.border};font-size:13.5px;color:${G.ink};vertical-align:middle}
tr:last-child td{border-bottom:none}
tr:hover td{background:rgba(20,16,10,0.015)}
.btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:10px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;transition:all 0.15s}
.btn-primary{background:${G.accent};color:#fff}.btn-primary:hover{background:#a86e4c}
.btn-secondary{background:${G.accentSoft};color:${G.accent};border:1px solid ${G.accentBrd}}
.btn-danger{background:${G.dangerSoft};color:${G.danger};border:1px solid rgba(192,57,43,0.2)}
.btn-ghost{background:transparent;color:${G.muted};border:1px solid ${G.border}}
.btn-sm{padding:5px 10px;font-size:12px;border-radius:8px}
.btn:disabled{opacity:0.5;cursor:not-allowed}
.badge{display:inline-flex;align-items:center;padding:3px 9px;border-radius:999px;font-size:11px;font-weight:700}
.badge-active{background:${G.successSoft};color:${G.success}}
.badge-disabled{background:${G.dangerSoft};color:${G.danger}}
.badge-admin{background:rgba(191,127,90,0.15);color:${G.accent}}
.badge-staff{background:rgba(20,16,10,0.07);color:${G.ink}}
.badge-guest{background:rgba(20,16,10,0.04);color:${G.muted}}
.form-grid{display:grid;gap:14px}.form-grid-2{grid-template-columns:1fr 1fr}
.form-group{display:flex;flex-direction:column;gap:6px}
.form-label{font-size:11px;font-weight:700;letter-spacing:1px;color:${G.muted};text-transform:uppercase}
.form-input{padding:10px 14px;border:1px solid ${G.border};border-radius:10px;font-family:'DM Sans',sans-serif;font-size:14px;color:${G.ink};background:${G.bg};outline:none;transition:border 0.15s}
.form-input:focus{border-color:${G.accent};background:#fff}
.form-textarea{min-height:80px;resize:vertical}
.form-select{appearance:none;cursor:pointer}
.modal-overlay{position:fixed;inset:0;background:rgba(20,10,0,0.5);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:1000;padding:20px}
.modal{background:${G.card};border-radius:20px;padding:28px;width:100%;max-width:560px;max-height:90vh;overflow-y:auto;box-shadow:0 24px 64px rgba(20,10,0,0.25)}
.modal-wide{max-width:700px}
.modal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}
.modal-title{font-family:'Playfair Display',serif;font-size:20px;font-weight:700}
.modal-close{width:32px;height:32px;border-radius:999px;border:1px solid ${G.border};background:${G.bg};cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;color:${G.muted};transition:all 0.15s}
.modal-close:hover{color:${G.danger}}
.modal-footer{display:flex;gap:10px;justify-content:flex-end;margin-top:24px;padding-top:20px;border-top:1px solid ${G.border}}
.search-bar{display:flex;align-items:center;gap:10px;background:${G.bg};border:1px solid ${G.border};border-radius:12px;padding:8px 14px}
.search-bar input{border:none;background:none;outline:none;font-family:'DM Sans',sans-serif;font-size:13.5px;color:${G.ink};flex:1}
.section-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}
.section-title{font-family:'Playfair Display',serif;font-size:22px;font-weight:700}
.section-subtitle{font-size:13px;color:${G.muted};margin-top:2px}
.empty-state{text-align:center;padding:48px 24px;color:${G.muted}}
.empty-icon{font-size:36px;margin-bottom:12px}
.error-banner{background:${G.dangerSoft};border:1px solid rgba(192,57,43,0.2);border-radius:10px;padding:12px 16px;color:${G.danger};font-size:13px;font-weight:500;margin-bottom:16px}
.loading{display:flex;align-items:center;justify-content:center;padding:48px;color:${G.muted};gap:10px}
.spinner{width:20px;height:20px;border:2px solid ${G.border};border-top-color:${G.accent};border-radius:999px;animation:spin 0.7s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.thumb{width:40px;height:40px;border-radius:8px;object-fit:cover;background:${G.bg};border:1px solid ${G.border}}
.avatar{width:34px;height:34px;border-radius:999px;background:${G.accentSoft};border:1px solid ${G.accentBrd};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:${G.accent}}
.flex{display:flex}.items-center{align-items:center}.gap-2{gap:8px}
.toggle{position:relative;width:40px;height:22px}
.toggle input{opacity:0;width:0;height:0}
.toggle-slider{position:absolute;inset:0;background:${G.border};border-radius:999px;cursor:pointer;transition:background 0.2s}
.toggle-slider::before{content:'';position:absolute;height:16px;width:16px;left:3px;top:3px;background:white;border-radius:999px;transition:transform 0.2s}
input:checked+.toggle-slider{background:${G.accent}}
input:checked+.toggle-slider::before{transform:translateX(18px)}
.login-page{min-height:100vh;display:flex;align-items:center;justify-content:center;background:${G.sidebar}}
.login-card{background:${G.card};border-radius:24px;padding:40px;width:100%;max-width:400px;box-shadow:0 32px 80px rgba(0,0,0,0.4)}
.login-logo{text-align:center;margin-bottom:32px}
.login-logo-name{font-family:'Playfair Display',serif;font-size:32px;font-weight:900;color:${G.ink}}
.login-logo-sub{font-size:12px;color:${G.muted};margin-top:4px;letter-spacing:2px;text-transform:uppercase}
.login-form{display:flex;flex-direction:column;gap:14px}
.login-btn{width:100%;padding:14px;background:${G.accent};color:#fff;border:none;border-radius:12px;font-family:'DM Sans',sans-serif;font-size:15px;font-weight:700;cursor:pointer;transition:background 0.15s;margin-top:6px}
.login-btn:hover{background:#a86e4c}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{padding:4px 12px;border-radius:999px;font-size:12px;font-weight:600;cursor:pointer;border:1px solid ${G.border};background:${G.bg};color:${G.muted};transition:all 0.15s}
.chip.active{background:${G.accentSoft};border-color:${G.accentBrd};color:${G.ink}}
.img-preview{width:100%;height:140px;object-fit:cover;border-radius:10px;border:1px solid ${G.border};background:${G.bg};margin-bottom:16px;overflow:hidden}
.img-preview img{width:100%;height:100%;object-fit:cover}
.lang-toggle{display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:8px;background:${G.bg};border:1px solid ${G.border};cursor:pointer;font-size:12px;font-weight:600;color:${G.muted};transition:all 0.15s}
.lang-toggle:hover{border-color:${G.accent};color:${G.accent}}
.file-input-wrapper{position:relative;overflow:hidden;display:inline-block}
.file-input-wrapper input[type=file]{position:absolute;left:0;top:0;opacity:0;cursor:pointer;width:100%;height:100%}
`;

// ─────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────
const Spinner = () => <div className="spinner" />;
const Loading = ({ text = "Loading…" }) => (
  <div className="loading"><Spinner />{text}</div>
);
const Err = ({ msg }) => msg ? <div className="error-banner">⚠ {msg}</div> : null;
const fmtDate = d => d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";
const fmtDateTime = d => d ? new Date(d).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "—";
const initials = name => name ? name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "?";

function Toggle({ checked, onChange }) {
  return (
    <label className="toggle">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
      <span className="toggle-slider" />
    </label>
  );
}

const fileToBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

// ─────────────────────────────────────────────────────────────
// LOGIN PAGE
// ─────────────────────────────────────────────────────────────
function LoginPage({ onLogin, t, lang, setLang }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    try {
      const res = await api("/v2/auth/login_email", {
        method: "POST",
        body: JSON.stringify({ email, password: pass }),
      });
      onLogin(res.access_token, { email });
    } catch (e) {
      setErr(e.message || t.loginFailed);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-name">{t.appName}</div>
          <div className="login-logo-sub">{t.subtitle}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
          <div className="lang-toggle" onClick={() => setLang(lang === "en" ? "ru" : "en")}>
            🌐 {lang === "en" ? "RU" : "EN"}
          </div>
        </div>
        <Err msg={err} />
        <form className="login-form" onSubmit={submit}>
          <div className="form-group">
            <label className="form-label">{t.email}</label>
            <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@domapp.com" required />
          </div>
          <div className="form-group">
            <label className="form-label">{t.password}</label>
            <input className="form-input" type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" required />
          </div>
          <button className="login-btn" type="submit" disabled={loading}>
            {loading ? t.saving : t.signIn}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD
// ─────────────────────────────────────────────────────────────
function Dashboard({ token, t }) {
  const [stats, setStats] = useState({ users: null, products: null, events: null, activeUsers: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api("/v2/admin/users?limit=1&skip=0", {}, token).catch(() => null),
      api("/marketplace/products?limit=1", {}, token).catch(() => null),
      api("/schedule/events", {}, token).catch(() => null),
      api("/v2/admin/users?limit=100&status=active", {}, token).catch(() => null),
    ]).then(([users, products, events, active]) => {
      setStats({
        users: Array.isArray(users) ? users.length : "—",
        products: Array.isArray(products) ? products.length : "—",
        events: Array.isArray(events) ? events.length : "—",
        activeUsers: Array.isArray(active) ? active.length : "—",
      });
      setLoading(false);
    });
  }, [token]);

  const cards = [
    { icon: "👥", label: t.totalUsers, num: stats.users, color: G.accentSoft },
    { icon: "✅", label: t.activeUsers, num: stats.activeUsers, color: G.successSoft },
    { icon: "🛍️", label: t.products, num: stats.products, color: "#EFF6FF" },
    { icon: "📅", label: t.eventsLabel, num: stats.events, color: "#FFF7ED" },
  ];

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">{t.dashboard}</div>
          <div className="section-subtitle">{t.welcome}</div>
        </div>
      </div>
      <div className="stats-grid">
        {cards.map(c => (
          <div key={c.label} className="stat-card">
            <div className="stat-icon" style={{ background: c.color }}>
              <span style={{ fontSize: 20 }}>{c.icon}</span>
            </div>
            <div className="stat-num">{loading ? "—" : c.num}</div>
            <div className="stat-label">{c.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="card">
          <div className="card-title" style={{ marginBottom: 12 }}>{t.quickActions}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <button className="btn btn-ghost" style={{ justifyContent: "flex-start" }}>{t.createNewUser}</button>
            <button className="btn btn-ghost" style={{ justifyContent: "flex-start" }}>{t.addProductAction}</button>
            <button className="btn btn-ghost" style={{ justifyContent: "flex-start" }}>{t.scheduleEvent}</button>
            <button className="btn btn-ghost" style={{ justifyContent: "flex-start" }}>{t.createGroupAction}</button>
          </div>
        </div>
        <div className="card">
          <div className="card-title" style={{ marginBottom: 12 }}>{t.systemStatus}</div>
          {[
            [t.apiServer, true],
            [t.llmProvider, true],
            [t.tts, true],
            [t.stt, true],
          ].map(([name, ok]) => (
            <div key={name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${G.border}` }}>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{name}</span>
              <span className={`badge ${ok ? "badge-active" : "badge-disabled"}`}>{ok ? t.online : t.offline}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// USERS
// ─────────────────────────────────────────────────────────────
function Users({ token, t }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState("");

  const load = async () => {
    setLoading(true);
    setErr("");
    try {
      const params = new URLSearchParams({ limit: 100, skip: 0 });
      if (roleFilter !== "all") params.set("role", roleFilter);
      if (statusFilter !== "all") params.set("status", statusFilter);
      const data = await api(`/v2/admin/users?${params}`, {}, token);
      setUsers(data || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [roleFilter, statusFilter]);

  const filtered = users.filter(u => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (u.email || "").toLowerCase().includes(q) || (u.display_name || "").toLowerCase().includes(q);
  });

  const openCreate = () => {
    setForm({ email: "", password: "", display_name: "", role: "staff", status: "active" });
    setFormErr("");
    setModal("create");
  };

  const openEdit = u => {
    setForm({ role: u.role, status: u.status, display_name: u.display_name || "" });
    setFormErr("");
    setModal(u);
  };

  const save = async () => {
    setSaving(true);
    setFormErr("");
    try {
      if (modal === "create") {
        const u = await api("/v2/admin/users", { method: "POST", body: JSON.stringify(form) }, token);
        setUsers(prev => [u, ...prev]);
      } else {
        const u = await api(`/v2/admin/users/${modal.id}`, { method: "PATCH", body: JSON.stringify({ role: form.role, status: form.status, display_name: form.display_name }) }, token);
        setUsers(prev => prev.map(x => x.id === u.id ? u : x));
      }
      setModal(null);
    } catch (e) {
      setFormErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  const quickToggle = async (user, field, val) => {
    try {
      const u = await api(`/v2/admin/users/${user.id}`, { method: "PATCH", body: JSON.stringify({ [field]: val }) }, token);
      setUsers(prev => prev.map(x => x.id === u.id ? u : x));
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">{t.users}</div>
          <div className="section-subtitle">{users.length} total · {t.manageAccounts}</div>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>+ {t.newUser}</button>
      </div>
      <Err msg={err} />
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div className="search-bar" style={{ flex: 1, minWidth: 200 }}>
          <span>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.searchNameEmail} />
        </div>
        <div className="chips">
          {["all", "admin", "staff", "guest"].map(r => (
            <div key={r} className={`chip ${roleFilter === r ? "active" : ""}`} onClick={() => setRoleFilter(r)}>
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </div>
          ))}
        </div>
        <div className="chips">
          {["all", "active", "disabled"].map(s => (
            <div key={s} className={`chip ${statusFilter === s ? "active" : ""}`} onClick={() => setStatusFilter(s)}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ padding: 0 }}>
        {loading ? <Loading /> : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t.product}</th>
                  <th>{t.role}</th>
                  <th>{t.status}</th>
                  <th>{t.joined}</th>
                  <th>{t.lastActive}</th>
                  <th>{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="avatar">{initials(u.display_name || u.email)}</div>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{u.display_name || "—"}</div>
                          <div style={{ fontSize: 11, color: G.muted }}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className={`badge badge-${u.role}`}>{u.role}</span></td>
                    <td>
                      <Toggle checked={u.status === "active"} onChange={v => quickToggle(u, "status", v ? "active" : "disabled")} />
                    </td>
                    <td style={{ color: G.muted, fontSize: 12 }}>{fmtDate(u.created_at)}</td>
                    <td style={{ color: G.muted, fontSize: 12 }}>{fmtDate(u.last_active)}</td>
                    <td>
                      <button className="btn btn-secondary btn-sm" onClick={() => openEdit(u)}>{t.edit}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="empty-state"><div className="empty-icon">👤</div>{t.noUsersFound}</div>}
          </div>
        )}
      </div>
      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">{modal === "create" ? t.createUser : t.editUser}</div>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <Err msg={formErr} />
            <div className="form-grid">
              {modal === "create" && (
                <>
                  <div className="form-group">
                    <label className="form-label">{t.email} *</label>
                    <input className="form-input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="user@example.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t.password} *</label>
                    <input className="form-input" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Min 8 characters" />
                  </div>
                </>
              )}
              <div className="form-group">
                <label className="form-label">{t.displayName}</label>
                <input className="form-input" value={form.display_name} onChange={e => setForm(f => ({ ...f, display_name: e.target.value }))} placeholder="Name shown to users" />
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">{t.role}</label>
                  <select className="form-input form-select" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                    <option value="guest">{t.guest}</option>
                    <option value="staff">{t.staff}</option>
                    <option value="admin">{t.admin}</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">{t.status}</label>
                  <select className="form-input form-select" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    <option value="active">{t.active}</option>
                    <option value="disabled">{t.disabled}</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>{t.cancel}</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? t.saving : modal === "create" ? t.createUser : t.save}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MARKETPLACE (with RUB currency + Image Upload + Bilingual)
// ─────────────────────────────────────────────────────────────
const EMPTY_PRODUCT = { title_en: "", title_ru: "", description_en: "", description_ru: "", price: "", image_url: "", image_file: null, category: "tea" };

function Marketplace({ token, t }) {
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState(["tea", "honey", "sets", "accessories"]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_PRODUCT);
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const [prods, categories] = await Promise.all([
        api("/marketplace/products?sort=new&limit=100", {}, token),
        api("/marketplace/categories", {}, token),
      ]);
      setProducts(prods || []);
      if (Array.isArray(categories) && categories.length) setCats(categories);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const filtered = products.filter(p => {
    const catOk = catFilter === "all" || p.category === catFilter;
    const q = search.toLowerCase();
    return catOk && (!q || p.title_en.toLowerCase().includes(q) || p.title_ru.toLowerCase().includes(q));
  });

  const openCreate = () => {
    setForm({ ...EMPTY_PRODUCT, category: cats[0] || "tea" });
    setFormErr("");
    setModal("create");
  };

  const openEdit = p => {
    setForm({
      title_en: p.title_en,
      title_ru: p.title_ru,
      description_en: p.description_en || "",
      description_ru: p.description_ru || "",
      price: String(p.price),
      image_url: p.image_url || "",
      image_file: null,
      category: p.category,
      is_active: p.is_active
    });
    setFormErr("");
    setModal(p);
  };

  const save = async () => {
    if (!form.title_en || !form.title_ru || !form.price) {
      setFormErr(`${t.titleRequired} ${t.required}`);
      return;
    }
    setSaving(true);
    setFormErr("");
    try {
      let image_url = form.image_url;
      if (form.image_file) {
        image_url = await fileToBase64(form.image_file);
      }
      const body = {
        title_en: form.title_en,
        title_ru: form.title_ru,
        description_en: form.description_en || null,
        description_ru: form.description_ru || null,
        price: parseFloat(form.price),
        image_url: image_url || null,
        category: form.category
      };
      if (modal !== "create") body.is_active = form.is_active;
      if (modal === "create") {
        const p = await api("/marketplace/admin/products", { method: "POST", body: JSON.stringify(body) }, token);
        setProducts(prev => [p, ...prev]);
      } else {
        const p = await api(`/marketplace/admin/products/${modal.id}`, { method: "PUT", body: JSON.stringify(body) }, token);
        setProducts(prev => prev.map(x => x.id === p.id ? p : x));
      }
      setModal(null);
    } catch (e) {
      setFormErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  const del = async p => {
    if (!confirm(`${t.confirmDelete} "${p.title_en}"?`)) return;
    try {
      await api(`/marketplace/admin/products/${p.id}`, { method: "DELETE" }, token).catch(e => {
        if (!e.message.includes("JSON") && !e.message.includes("parse")) throw e;
      });
      setProducts(prev => prev.filter(x => x.id !== p.id));
    } catch (e) {
      setErr(e.message);
    }
  };

  const toggleActive = async p => {
    try {
      const updated = await api(`/marketplace/admin/products/${p.id}`, { method: "PUT", body: JSON.stringify({ is_active: !p.is_active }) }, token);
      setProducts(prev => prev.map(x => x.id === updated.id ? updated : x));
    } catch (e) {
      setErr(e.message);
    }
  };

  const activeCount = products.filter(p => p.is_active).length;
  const catNames = { tea: t.tea, honey: t.honey, sets: t.sets, accessories: t.accessories };

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">{t.marketplace}</div>
          <div className="section-subtitle">{products.length} {t.productsActive} {activeCount}</div>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>+ {t.addProduct}</button>
      </div>
      <Err msg={err} />
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <div className="search-bar" style={{ flex: 1, minWidth: 200 }}>
          <span>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.searchProducts} />
        </div>
        <div className="chips">
          {["all", ...cats].map(c => (
            <div key={c} className={`chip ${catFilter === c ? "active" : ""}`} onClick={() => setCatFilter(c)}>
              {c === "all" ? t.all : catNames[c] || c}
            </div>
          ))}
        </div>
      </div>
      <div className="card" style={{ padding: 0 }}>
        {loading ? <Loading /> : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t.product}</th>
                  <th>{t.category}</th>
                  <th>{t.price}</th>
                  <th>{t.visible}</th>
                  <th>{t.updated}</th>
                  <th>{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        {p.image_url ? <img className="thumb" src={p.image_url} alt="" onError={e => e.target.style.display = "none"} /> : <div className="thumb" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>🖼</div>}
                        <div>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{p.title_en}</div>
                          <div style={{ fontSize: 11, color: G.muted }}>{p.title_ru}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="badge badge-staff">{catNames[p.category] || p.category}</span></td>
                    <td style={{ fontWeight: 700, color: G.accent }}>₽{p.price.toFixed(2)}</td>
                    <td><Toggle checked={p.is_active} onChange={() => toggleActive(p)} /></td>
                    <td style={{ fontSize: 12, color: G.muted }}>{fmtDate(p.updated_at)}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-secondary btn-sm" onClick={() => openEdit(p)}>{t.edit}</button>
                        <button className="btn btn-danger btn-sm" onClick={() => del(p)}>{t.delete}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && <div className="empty-state"><div className="empty-icon">📦</div>{t.noProductsFound}</div>}
          </div>
        )}
      </div>
      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal modal-wide">
            <div className="modal-header">
              <div className="modal-title">{modal === "create" ? t.addProduct : t.editProduct}</div>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <Err msg={formErr} />
            {form.image_url && (
              <div className="img-preview">
                <img src={form.image_url} alt="" onError={e => e.target.style.display = "none"} />
              </div>
            )}
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">{t.image}</label>
                <div className="file-input-wrapper" style={{ marginBottom: 8 }}>
                  <button className="btn btn-secondary" style={{ width: "100%" }}>{t.uploadImage}</button>
                  <input type="file" accept="image/*" onChange={async e => {
                    const file = e.target.files[0];
                    if (file) {
                      const preview = URL.createObjectURL(file);
                      setForm(f => ({ ...f, image_file: file, image_url: preview }));
                    }
                  }} />
                </div>
                <span style={{ fontSize: 11, color: G.muted }}>{t.max5mb}</span>
                <span style={{ fontSize: 11, color: G.muted, display: "block", marginTop: 4 }}>{t.orUrl}</span>
                <input className="form-input" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://…" style={{ marginTop: 8 }} />
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">{t.titleEn} *</label>
                  <input className="form-input" value={form.title_en} onChange={e => setForm(f => ({ ...f, title_en: e.target.value }))} placeholder={t.titleEnPlaceholder || "e.g. Jasmine Tea"} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.titleRu} *</label>
                  <input className="form-input" value={form.title_ru} onChange={e => setForm(f => ({ ...f, title_ru: e.target.value }))} placeholder={t.titleRuPlaceholder || "Жасминовый чай"} />
                </div>
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">{t.descriptionEn}</label>
                  <textarea className="form-input form-textarea" value={form.description_en} onChange={e => setForm(f => ({ ...f, description_en: e.target.value }))} placeholder="English description…" />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.descriptionRu}</label>
                  <textarea className="form-input form-textarea" value={form.description_ru} onChange={e => setForm(f => ({ ...f, description_ru: e.target.value }))} placeholder="Описание на русском…" />
                </div>
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">{t.priceLabel} *</label>
                  <input className="form-input" type="number" min="0" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="2499.00" />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.categoryLabel} *</label>
                  <select className="form-input form-select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {cats.map(c => <option key={c} value={c}>{catNames[c] || c}</option>)}
                  </select>
                </div>
              </div>
              {modal !== "create" && (
                <div className="form-group">
                  <label className="form-label">{t.visibility}</label>
                  <div className="flex items-center gap-2" style={{ paddingTop: 4 }}>
                    <Toggle checked={form.is_active} onChange={v => setForm(f => ({ ...f, is_active: v }))} />
                    <span style={{ fontSize: 13, color: G.muted }}>{form.is_active ? t.visibleToUsers : t.hiddenFromUsers}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>{t.cancel}</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? t.saving : modal === "create" ? t.addProduct : t.save}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// EVENTS
// ─────────────────────────────────────────────────────────────
const EMPTY_EVENT = { title_en: "", title_ru: "", description_en: "", description_ru: "", start_time: "", end_time: "", capacity: "20", kind: "" };

function Events({ token, t }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_EVENT);
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const start = new Date().toISOString().split("T")[0];
      const end = new Date(Date.now() + 60 * 86400000).toISOString().split("T")[0];
      const data = await api(`/schedule/events?start=${start}&end=${end}`, {}, token);
      setEvents(data || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const toInputDT = iso => iso ? new Date(iso).toISOString().slice(0, 16) : "";
  const fromInputDT = s => s ? new Date(s).toISOString() : "";

  const openCreate = () => { setForm(EMPTY_EVENT); setFormErr(""); setModal("create"); };

  const openEdit = ev => {
    setForm({
      title_en: ev.title_en,
      title_ru: ev.title_ru,
      description_en: ev.description_en || "",
      description_ru: ev.description_ru || "",
      start_time: toInputDT(ev.start_time),
      end_time: toInputDT(ev.end_time),
      capacity: String(ev.capacity),
      kind: ev.kind || ""
    });
    setFormErr("");
    setModal(ev);
  };

  const save = async () => {
    if (!form.title_en || !form.title_ru || !form.start_time || !form.end_time) {
      setFormErr(`${t.eventTitleRequired} ${t.required}`);
      return;
    }
    setSaving(true);
    setFormErr("");
    try {
      const body = {
        title_en: form.title_en,
        title_ru: form.title_ru,
        description_en: form.description_en || "",
        description_ru: form.description_ru || "",
        start_time: fromInputDT(form.start_time),
        end_time: fromInputDT(form.end_time),
        capacity: parseInt(form.capacity) || 20,
        kind: form.kind || ""
      };
      if (modal === "create") {
        const ev = await api("/schedule/admin/events", { method: "POST", body: JSON.stringify(body) }, token);
        setEvents(prev => [...prev, ev].sort((a, b) => new Date(a.start_time) - new Date(b.start_time)));
      } else {
        const ev = await api(`/schedule/admin/events/${modal.id}`, { method: "PUT", body: JSON.stringify(body) }, token);
        setEvents(prev => prev.map(x => x.id === ev.id ? ev : x));
      }
      setModal(null);
    } catch (e) {
      setFormErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  const del = async ev => {
    if (!confirm(`${t.confirmDelete} "${ev.title_en}"?`)) return;
    try {
      await api(`/schedule/admin/events/${ev.id}`, { method: "DELETE" }, token).catch(e => {
        if (!e.message.includes("JSON") && !e.message.includes("parse")) throw e;
      });
      setEvents(prev => prev.filter(x => x.id !== ev.id));
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">{t.events}</div>
          <div className="section-subtitle">{events.length} {t.upcomingEvents}</div>
        </div>
        <button className="btn btn-primary" onClick={openCreate}>+ {t.newEvent}</button>
      </div>
      <Err msg={err} />
      <div className="card" style={{ padding: 0 }}>
        {loading ? <Loading /> : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t.event}</th>
                  <th>{t.type}</th>
                  <th>{t.start}</th>
                  <th>{t.end}</th>
                  <th>{t.capacity}</th>
                  <th>{t.spotsLeft}</th>
                  <th>{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {events.map(ev => (
                  <tr key={ev.id}>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{ev.title_en}</div>
                      <div style={{ fontSize: 11, color: G.muted }}>{ev.title_ru}</div>
                    </td>
                    <td><span className="badge badge-staff">{ev.kind || t.general}</span></td>
                    <td style={{ fontSize: 12 }}>{fmtDateTime(ev.start_time)}</td>
                    <td style={{ fontSize: 12 }}>{fmtDateTime(ev.end_time)}</td>
                    <td style={{ textAlign: "center" }}>{ev.capacity}</td>
                    <td>
                      <span className={`badge ${ev.spots_left > 0 ? "badge-active" : "badge-disabled"}`}>
                        {ev.spots_left > 0 ? `${ev.spots_left} ${t.left}` : t.full}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="btn btn-secondary btn-sm" onClick={() => openEdit(ev)}>{t.edit}</button>
                        <button className="btn btn-danger btn-sm" onClick={() => del(ev)}>{t.delete}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {events.length === 0 && <div className="empty-state"><div className="empty-icon">📅</div>{t.noEventsScheduled}</div>}
          </div>
        )}
      </div>
      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
          <div className="modal modal-wide">
            <div className="modal-header">
              <div className="modal-title">{modal === "create" ? t.createEvent : t.editEvent}</div>
              <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <Err msg={formErr} />
            <div className="form-grid">
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">{t.titleEn} *</label>
                  <input className="form-input" value={form.title_en} onChange={e => setForm(f => ({ ...f, title_en: e.target.value }))} placeholder="Event name in English" />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.titleRu} *</label>
                  <input className="form-input" value={form.title_ru} onChange={e => setForm(f => ({ ...f, title_ru: e.target.value }))} placeholder="Название события" />
                </div>
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">{t.descriptionEn}</label>
                  <textarea className="form-input form-textarea" value={form.description_en} onChange={e => setForm(f => ({ ...f, description_en: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.descriptionRu}</label>
                  <textarea className="form-input form-textarea" value={form.description_ru} onChange={e => setForm(f => ({ ...f, description_ru: e.target.value }))} />
                </div>
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">{t.startTime} *</label>
                  <input className="form-input" type="datetime-local" value={form.start_time} onChange={e => setForm(f => ({ ...f, start_time: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.endTime} *</label>
                  <input className="form-input" type="datetime-local" value={form.end_time} onChange={e => setForm(f => ({ ...f, end_time: e.target.value }))} />
                </div>
              </div>
              <div className="form-grid form-grid-2">
                <div className="form-group">
                  <label className="form-label">{t.capacity}</label>
                  <input className="form-input" type="number" min="1" value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">{t.eventType}</label>
                  <input className="form-input" value={form.kind} onChange={e => setForm(f => ({ ...f, kind: e.target.value }))} placeholder="e.g. ceremony, workshop…" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>{t.cancel}</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? t.saving : modal === "create" ? t.createEvent : t.save}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// GROUPS
// ─────────────────────────────────────────────────────────────
function Groups({ token, t }) {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", member_ids: "" });
  const [saving, setSaving] = useState(false);
  const [formErr, setFormErr] = useState("");
  const [memberModal, setMemberModal] = useState(null);
  const [memberId, setMemberId] = useState("");
  const [memberSaving, setMemberSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api("/v2/threads", {}, token);
      setThreads((data || []).filter(t => t.type === "guide" || t.type === "support" || !t.type));
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const createGroup = async () => {
    if (!form.title.trim()) {
      setFormErr(`${t.groupTitleRequired} ${t.required}`);
      return;
    }
    setSaving(true);
    setFormErr("");
    try {
      const params = new URLSearchParams({ title: form.title });
      if (form.description) params.set("description", form.description);
      const memberIds = form.member_ids.split(",").map(s => s.trim()).filter(Boolean);
      const body = memberIds.length > 0 ? memberIds : null;
      const group = await api(`/v2/admin/groups?${params}`, { method: "POST", body: JSON.stringify(body) }, token);
      setThreads(prev => [group, ...prev]);
      setModal(false);
    } catch (e) {
      setFormErr(e.message);
    } finally {
      setSaving(false);
    }
  };

  const addMember = async () => {
    if (!memberId.trim()) return;
    setMemberSaving(true);
    try {
      await api(`/v2/admin/groups/${memberModal.id}/members`, { method: "POST", body: JSON.stringify({ user_id: memberId.trim() }) }, token);
      setMemberId("");
      alert(t.memberAdded);
    } catch (e) {
      alert(e.message);
    } finally {
      setMemberSaving(false);
    }
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">{t.groups}</div>
          <div className="section-subtitle">{t.manageGroups}</div>
        </div>
        <button className="btn btn-primary" onClick={() => { setForm({ title: "", description: "", member_ids: "" }); setFormErr(""); setModal(true); }}>+ {t.createGroup}</button>
      </div>
      <Err msg={err} />
      <div className="card" style={{ padding: 0 }}>
        {loading ? <Loading /> : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t.groupName}</th>
                  <th>{t.type}</th>
                  <th>{t.joined}</th>
                  <th>{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {threads.map(t_item => (
                  <tr key={t_item.id}>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{t_item.title || "(Untitled)"}</div>
                      <div style={{ fontSize: 10, color: G.muted, fontFamily: "monospace" }}>{t_item.id}</div>
                    </td>
                    <td><span className="badge badge-staff">{t_item.type}</span></td>
                    <td style={{ fontSize: 12, color: G.muted }}>{fmtDate(t_item.created_at)}</td>
                    <td>
                      <button className="btn btn-secondary btn-sm" onClick={() => { setMemberId(""); setMemberModal(t_item); }}>{t.manageMembers}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {threads.length === 0 && <div className="empty-state"><div className="empty-icon">💬</div>{t.noGroupsFound}</div>}
          </div>
        )}
      </div>
      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">{t.createGroup}</div>
              <button className="modal-close" onClick={() => setModal(false)}>✕</button>
            </div>
            <Err msg={formErr} />
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">{t.groupName} *</label>
                <input className="form-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder={t.groupNamePlaceholder || "e.g. Morning Tea Circle"} />
              </div>
              <div className="form-group">
                <label className="form-label">{t.description}</label>
                <input className="form-input" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder={t.descriptionPlaceholder || "What is this group for?"} />
              </div>
              <div className="form-group">
                <label className="form-label">{t.members}</label>
                <textarea className="form-input form-textarea" value={form.member_ids} onChange={e => setForm(f => ({ ...f, member_ids: e.target.value }))} placeholder={t.memberIdsPlaceholder || "Comma-separated UUIDs"} />
                <span style={{ fontSize: 11, color: G.muted }}>{t.leaveBlank || "Leave blank to create an empty group"}</span>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setModal(false)}>{t.cancel}</button>
              <button className="btn btn-primary" onClick={createGroup} disabled={saving}>{saving ? t.saving : t.createGroup}</button>
            </div>
          </div>
        </div>
      )}
      {memberModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setMemberModal(null)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">{t.manageMembers}</div>
              <button className="modal-close" onClick={() => setMemberModal(null)}>✕</button>
            </div>
            <div style={{ marginBottom: 16, padding: "12px 14px", background: G.bg, borderRadius: 10, fontSize: 12, color: G.muted }}>
              {t.groupName}: <strong style={{ color: G.ink }}>{memberModal.title}</strong>
            </div>
            <div className="form-group" style={{ marginBottom: 12 }}>
              <label className="form-label">{t.addMember}</label>
              <div className="flex gap-2">
                <input className="form-input" style={{ flex: 1 }} value={memberId} onChange={e => setMemberId(e.target.value)} placeholder={t.userUuid} />
                <button className="btn btn-primary" onClick={addMember} disabled={memberSaving}>{memberSaving ? "…" : t.addMember}</button>
              </div>
            </div>
            <div style={{ fontSize: 12, color: G.muted, padding: "10px 0" }}>
              {t.toRemoveMember} <code style={{ background: G.bg, padding: "2px 6px", borderRadius: 4 }}>DELETE /v2/admin/groups/{"{thread_id}"}/members/{"{user_id}"}</code>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setMemberModal(null)}>{t.close}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MEMORY
// ─────────────────────────────────────────────────────────────
function Memory({ token, t }) {
  const [userId, setUserId] = useState("");
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [deleting, setDeleting] = useState(null);

  const search = async () => {
    if (!userId || !query) {
      setErr(`${t.userId} ${t.searchQuery} ${t.required}`);
      return;
    }
    setLoading(true);
    setErr("");
    setResults([]);
    try {
      const data = await api(`/v1/memory/semantic/search?user_id=${userId}&q=${encodeURIComponent(query)}&k=20`, {}, token);
      setResults(data || []);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteParent = async parentId => {
    if (!confirm(`${t.deleteMemory} ${parentId}?`)) return;
    setDeleting(parentId);
    try {
      await api(`/v1/memory/semantic/delete_parent/${parentId}`, { method: "DELETE" }, token).catch(e => {
        if (!e.message.includes("JSON") && !e.message.includes("parse")) throw e;
      });
      setResults(prev => prev.filter(r => r.parent_id !== parentId));
    } catch (e) {
      setErr(e.message);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <div className="section-header">
        <div>
          <div className="section-title">{t.memory}</div>
          <div className="section-subtitle">{t.searchManageMemory}</div>
        </div>
      </div>
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="form-grid form-grid-2" style={{ marginBottom: 12 }}>
          <div className="form-group">
            <label className="form-label">{t.userId}</label>
            <input className="form-input" value={userId} onChange={e => setUserId(e.target.value)} placeholder={t.userUuid} />
          </div>
          <div className="form-group">
            <label className="form-label">{t.searchQuery}</label>
            <input className="form-input" value={query} onChange={e => setQuery(e.target.value)} placeholder={t.searchQueryPlaceholder || "e.g. anxiety, morning ritual…"} onKeyDown={e => e.key === "Enter" && search()} />
          </div>
        </div>
        <button className="btn btn-primary" onClick={search} disabled={loading}>{loading ? t.searching : t.searchMemory}</button>
      </div>
      <Err msg={err} />
      {results.length > 0 && (
        <div className="card" style={{ padding: 0 }}>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>{t.content}</th>
                  <th>{t.category}</th>
                  <th>{t.score}</th>
                  <th>{t.actions}</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i}>
                    <td style={{ maxWidth: 400, fontSize: 13 }}>{r.content || r.text || JSON.stringify(r)}</td>
                    <td><span className="badge badge-staff">{r.category || "—"}</span></td>
                    <td>{r.score ? (r.score * 100).toFixed(1) + "%" : "—"}</td>
                    <td>
                      {r.parent_id && (
                        <button className="btn btn-danger btn-sm" onClick={() => deleteParent(r.parent_id)} disabled={deleting === r.parent_id}>
                          {deleting === r.parent_id ? "…" : t.delete}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!loading && results.length === 0 && query && <div className="empty-state"><div className="empty-icon">🧠</div>{t.noMemoryEntries}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// APP SHELL
// ─────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard", icon: "📊", label: "dashboard" },
  { id: "users", icon: "👥", label: "users" },
  { id: "marketplace", icon: "🛍️", label: "marketplace" },
  { id: "events", icon: "📅", label: "events" },
  { id: "groups", icon: "💬", label: "groups" },
  { id: "memory", icon: "🧠", label: "memory" },
];

const SECTION_TITLES = {
  dashboard: "dashboard",
  users: "users",
  marketplace: "marketplace",
  events: "events",
  groups: "groups",
  memory: "memory",
};

function AdminShell({ token, user, onLogout, t, lang, setLang }) {
  const [section, setSection] = useState("dashboard");

  const Section = {
    dashboard: <Dashboard token={token} t={t} />,
    users: <Users token={token} t={t} />,
    marketplace: <Marketplace token={token} t={t} />,
    events: <Events token={token} t={t} />,
    groups: <Groups token={token} t={t} />,
    memory: <Memory token={token} t={t} />,
  }[section];

  return (
    <div className="admin-shell">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-kicker">DOM</div>
          <div className="sidebar-logo-name">{t.appName}</div>
          <div className="sidebar-logo-sub">{t.subtitle}</div>
        </div>
        <nav className="sidebar-nav">
          {NAV.map(n => (
            <button key={n.id} className={`nav-item ${section === n.id ? "active" : ""}`} onClick={() => setSection(n.id)}>
              <span className="nav-icon">{n.icon}</span>
              <span>{t[n.label]}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="sidebar-avatar">{initials(user?.email || "A")}</div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user?.email || "Admin"}</div>
              <div className="sidebar-user-role">{t.administrator}</div>
            </div>
            <button className="logout-btn" onClick={onLogout} title={t.signOut}>⬆</button>
          </div>
        </div>
      </aside>
      <div className="main">
        <header className="topbar">
          <div className="topbar-title">{t[SECTION_TITLES[section]]}</div>
          <div className="topbar-actions">
            <div className="lang-toggle" onClick={() => setLang(lang === "en" ? "ru" : "en")}>
              🌐 {lang === "en" ? "RU" : "EN"}
            </div>
            <span style={{ fontSize: 12, color: G.muted }}>DOM Backend · {BASE}</span>
          </div>
        </header>
        <div className="content">
          {Section}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────
export default function App() {
  const [token, setToken] = useState(() => sessionStorage.getItem("dom_admin_token") || null);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem("dom_admin_user"));
    } catch {
      return null;
    }
  });
  const [lang, setLang] = useState(() => localStorage.getItem("dom_admin_lang") || "en");
  const t = T[lang] || T.en;

  const handleLogin = (t, u) => {
    sessionStorage.setItem("dom_admin_token", t);
    sessionStorage.setItem("dom_admin_user", JSON.stringify(u));
    setToken(t);
    setUser(u);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("dom_admin_token");
    sessionStorage.removeItem("dom_admin_user");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    localStorage.setItem("dom_admin_lang", lang);
  }, [lang]);

  return (
    <>
      <style>{css}</style>
      {token ? (
        <AdminShell token={token} user={user} onLogout={handleLogout} t={t} lang={lang} setLang={setLang} />
      ) : (
        <LoginPage onLogin={handleLogin} t={t} lang={lang} setLang={setLang} />
      )}
    </>
  );
}




// import { useState, useEffect, useCallback, useRef } from "react";

// // ─────────────────────────────────────────────────────────────
// // CONFIG
// // ─────────────────────────────────────────────────────────────
// const BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000";

// // ─────────────────────────────────────────────────────────────
// // API HELPER
// // ─────────────────────────────────────────────────────────────
// async function api(path, opts = {}, token = null) {
//   const headers = { "Content-Type": "application/json", ...(opts.headers || {}) };
//   if (token) headers["Authorization"] = `Bearer ${token}`;
//   const res = await fetch(`${BASE}${path}`, { ...opts, headers });
//   if (res.status === 204) return null;
//   if (!res.ok) {
//     const err = await res.json().catch(() => ({ detail: res.statusText }));
//     throw new Error(err.detail || res.statusText);
//   }
//   return res.json();
// }

// // ─────────────────────────────────────────────────────────────
// // STYLES
// // ─────────────────────────────────────────────────────────────
// const G = {
//   bg:        "#F5F0E8",
//   sidebar:   "#1C1410",
//   sideHover: "#2A1F18",
//   sideActive:"#3D2B1F",
//   card:      "#FFFFFF",
//   border:    "rgba(20,16,10,0.09)",
//   ink:       "#14100A",
//   muted:     "rgba(20,16,10,0.45)",
//   accent:    "#BF7F5A",
//   accentSoft:"rgba(191,127,90,0.12)",
//   accentBrd: "rgba(191,127,90,0.3)",
//   danger:    "#C0392B",
//   dangerSoft:"rgba(192,57,43,0.09)",
//   success:   "#2E7D32",
//   successSoft:"rgba(46,125,50,0.09)",
//   warning:   "#B45309",
// };

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//   body { font-family: 'DM Sans', sans-serif; background: ${G.bg}; color: ${G.ink}; }

//   ::-webkit-scrollbar { width: 5px; }
//   ::-webkit-scrollbar-track { background: transparent; }
//   ::-webkit-scrollbar-thumb { background: ${G.border}; border-radius: 999px; }

//   .admin-shell { display: flex; height: 100vh; overflow: hidden; }

//   /* SIDEBAR */
//   .sidebar { width: 240px; min-width: 240px; background: ${G.sidebar}; display: flex; flex-direction: column; padding: 0; overflow: hidden; }
//   .sidebar-logo { padding: 28px 24px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); }
//   .sidebar-logo-kicker { font-size: 9px; font-weight: 700; letter-spacing: 3px; color: rgba(255,255,255,0.3); text-transform: uppercase; }
//   .sidebar-logo-name { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 900; color: #fff; margin-top: 4px; }
//   .sidebar-logo-sub { font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 2px; }
//   .sidebar-nav { flex: 1; padding: 16px 12px; overflow-y: auto; display: flex; flex-direction: column; gap: 2px; }
//   .nav-section-label { font-size: 9px; font-weight: 700; letter-spacing: 2.5px; color: rgba(255,255,255,0.2); text-transform: uppercase; padding: 12px 12px 6px; }
//   .nav-item { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; cursor: pointer; transition: background 0.15s; color: rgba(255,255,255,0.55); font-size: 13.5px; font-weight: 500; border: none; background: none; width: 100%; text-align: left; }
//   .nav-item:hover { background: ${G.sideHover}; color: rgba(255,255,255,0.85); }
//   .nav-item.active { background: ${G.sideActive}; color: #fff; }
//   .nav-item.active .nav-icon { color: ${G.accent}; }
//   .nav-icon { font-size: 16px; width: 20px; text-align: center; flex-shrink: 0; }
//   .nav-badge { margin-left: auto; background: ${G.accent}; color: #fff; font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 999px; }
//   .sidebar-footer { padding: 16px 12px; border-top: 1px solid rgba(255,255,255,0.06); }
//   .sidebar-user { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 10px; }
//   .sidebar-avatar { width: 32px; height: 32px; border-radius: 999px; background: ${G.accent}; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #fff; flex-shrink: 0; }
//   .sidebar-user-info { flex: 1; overflow: hidden; }
//   .sidebar-user-name { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.85); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
//   .sidebar-user-role { font-size: 10px; color: rgba(255,255,255,0.3); }
//   .logout-btn { padding: 6px; border-radius: 8px; border: none; background: none; color: rgba(255,255,255,0.3); cursor: pointer; font-size: 16px; transition: color 0.15s; }
//   .logout-btn:hover { color: ${G.danger}; }

//   /* MAIN */
//   .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
//   .topbar { padding: 0 28px; height: 60px; display: flex; align-items: center; justify-content: space-between; background: ${G.card}; border-bottom: 1px solid ${G.border}; flex-shrink: 0; }
//   .topbar-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: ${G.ink}; }
//   .topbar-actions { display: flex; align-items: center; gap: 10px; }
//   .content { flex: 1; overflow-y: auto; padding: 28px; }

//   /* CARDS */
//   .card { background: ${G.card}; border-radius: 16px; border: 1px solid ${G.border}; padding: 20px; box-shadow: 0 2px 12px rgba(20,16,10,0.06); }
//   .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
//   .card-title { font-size: 13px; font-weight: 700; color: ${G.muted}; text-transform: uppercase; letter-spacing: 1.5px; }

//   /* STAT CARDS */
//   .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
//   .stat-card { background: ${G.card}; border-radius: 16px; border: 1px solid ${G.border}; padding: 20px; box-shadow: 0 2px 12px rgba(20,16,10,0.06); }
//   .stat-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 18px; margin-bottom: 14px; }
//   .stat-num { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 900; color: ${G.ink}; line-height: 1; }
//   .stat-label { font-size: 12px; color: ${G.muted}; margin-top: 4px; font-weight: 500; }
//   .stat-delta { font-size: 11px; font-weight: 600; margin-top: 8px; }

//   /* TABLE */
//   .table-wrap { overflow-x: auto; }
//   table { width: 100%; border-collapse: collapse; }
//   th { font-size: 11px; font-weight: 700; letter-spacing: 1px; color: ${G.muted}; text-transform: uppercase; text-align: left; padding: 10px 14px; border-bottom: 1px solid ${G.border}; background: rgba(20,16,10,0.02); }
//   td { padding: 12px 14px; border-bottom: 1px solid ${G.border}; font-size: 13.5px; color: ${G.ink}; vertical-align: middle; }
//   tr:last-child td { border-bottom: none; }
//   tr:hover td { background: rgba(20,16,10,0.015); }

//   /* BUTTONS */
//   .btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 10px; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; transition: all 0.15s; }
//   .btn-primary { background: ${G.accent}; color: #fff; }
//   .btn-primary:hover { background: #a86e4c; }
//   .btn-secondary { background: ${G.accentSoft}; color: ${G.accent}; border: 1px solid ${G.accentBrd}; }
//   .btn-secondary:hover { background: rgba(191,127,90,0.2); }
//   .btn-danger { background: ${G.dangerSoft}; color: ${G.danger}; border: 1px solid rgba(192,57,43,0.2); }
//   .btn-danger:hover { background: rgba(192,57,43,0.15); }
//   .btn-ghost { background: transparent; color: ${G.muted}; border: 1px solid ${G.border}; }
//   .btn-ghost:hover { background: rgba(20,16,10,0.04); }
//   .btn-sm { padding: 5px 10px; font-size: 12px; border-radius: 8px; }
//   .btn:disabled { opacity: 0.5; cursor: not-allowed; }

//   /* BADGES */
//   .badge { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 999px; font-size: 11px; font-weight: 700; }
//   .badge-active { background: ${G.successSoft}; color: ${G.success}; }
//   .badge-disabled { background: ${G.dangerSoft}; color: ${G.danger}; }
//   .badge-admin { background: rgba(191,127,90,0.15); color: ${G.accent}; }
//   .badge-staff { background: rgba(20,16,10,0.07); color: ${G.ink}; }
//   .badge-guest { background: rgba(20,16,10,0.04); color: ${G.muted}; }
//   .badge-hidden { background: ${G.dangerSoft}; color: ${G.danger}; }

//   /* FORM */
//   .form-grid { display: grid; gap: 14px; }
//   .form-grid-2 { grid-template-columns: 1fr 1fr; }
//   .form-group { display: flex; flex-direction: column; gap: 6px; }
//   .form-label { font-size: 11px; font-weight: 700; letter-spacing: 1px; color: ${G.muted}; text-transform: uppercase; }
//   .form-input { padding: 10px 14px; border: 1px solid ${G.border}; border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: ${G.ink}; background: ${G.bg}; outline: none; transition: border 0.15s; }
//   .form-input:focus { border-color: ${G.accent}; background: #fff; }
//   .form-textarea { min-height: 80px; resize: vertical; }
//   .form-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23888' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; padding-right: 36px; cursor: pointer; }

//   /* MODAL */
//   .modal-overlay { position: fixed; inset: 0; background: rgba(20,10,0,0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
//   .modal { background: ${G.card}; border-radius: 20px; padding: 28px; width: 100%; max-width: 560px; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 64px rgba(20,10,0,0.25); }
//   .modal-wide { max-width: 700px; }
//   .modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
//   .modal-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; }
//   .modal-close { width: 32px; height: 32px; border-radius: 999px; border: 1px solid ${G.border}; background: ${G.bg}; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; color: ${G.muted}; transition: all 0.15s; }
//   .modal-close:hover { color: ${G.danger}; border-color: rgba(192,57,43,0.3); }
//   .modal-footer { display: flex; gap: 10px; justify-content: flex-end; margin-top: 24px; padding-top: 20px; border-top: 1px solid ${G.border}; }

//   /* SEARCH */
//   .search-bar { display: flex; align-items: center; gap: 10px; background: ${G.bg}; border: 1px solid ${G.border}; border-radius: 12px; padding: 8px 14px; }
//   .search-bar input { border: none; background: none; outline: none; font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: ${G.ink}; flex: 1; }
//   .search-bar input::placeholder { color: ${G.muted}; }

//   /* MISC */
//   .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
//   .section-title { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; }
//   .section-subtitle { font-size: 13px; color: ${G.muted}; margin-top: 2px; }
//   .empty-state { text-align: center; padding: 48px 24px; color: ${G.muted}; }
//   .empty-icon { font-size: 36px; margin-bottom: 12px; }
//   .error-banner { background: ${G.dangerSoft}; border: 1px solid rgba(192,57,43,0.2); border-radius: 10px; padding: 12px 16px; color: ${G.danger}; font-size: 13px; font-weight: 500; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
//   .loading { display: flex; align-items: center; justify-content: center; padding: 48px; color: ${G.muted}; gap: 10px; font-size: 14px; }
//   .spinner { width: 20px; height: 20px; border: 2px solid ${G.border}; border-top-color: ${G.accent}; border-radius: 999px; animation: spin 0.7s linear infinite; }
//   @keyframes spin { to { transform: rotate(360deg); } }
//   .thumb { width: 40px; height: 40px; border-radius: 8px; object-fit: cover; background: ${G.bg}; border: 1px solid ${G.border}; }
//   .avatar { width: 34px; height: 34px; border-radius: 999px; background: ${G.accentSoft}; border: 1px solid ${G.accentBrd}; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: ${G.accent}; }
//   .flex { display: flex; } .items-center { align-items: center; } .gap-2 { gap: 8px; } .gap-3 { gap: 12px; }
//   .toggle { position: relative; width: 40px; height: 22px; }
//   .toggle input { opacity: 0; width: 0; height: 0; }
//   .toggle-slider { position: absolute; inset: 0; background: ${G.border}; border-radius: 999px; cursor: pointer; transition: background 0.2s; }
//   .toggle-slider::before { content: ''; position: absolute; height: 16px; width: 16px; left: 3px; top: 3px; background: white; border-radius: 999px; transition: transform 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.2); }
//   input:checked + .toggle-slider { background: ${G.accent}; }
//   input:checked + .toggle-slider::before { transform: translateX(18px); }

//   /* LOGIN */
//   .login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: ${G.sidebar}; }
//   .login-card { background: ${G.card}; border-radius: 24px; padding: 40px; width: 100%; max-width: 400px; box-shadow: 0 32px 80px rgba(0,0,0,0.4); }
//   .login-logo { text-align: center; margin-bottom: 32px; }
//   .login-logo-name { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 900; color: ${G.ink}; }
//   .login-logo-sub { font-size: 12px; color: ${G.muted}; margin-top: 4px; letter-spacing: 2px; text-transform: uppercase; }
//   .login-form { display: flex; flex-direction: column; gap: 14px; }
//   .login-btn { width: 100%; padding: 14px; background: ${G.accent}; color: #fff; border: none; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 700; cursor: pointer; transition: background 0.15s; margin-top: 6px; }
//   .login-btn:hover { background: #a86e4c; }

//   .chips { display: flex; flex-wrap: wrap; gap: 8px; }
//   .chip { padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; cursor: pointer; border: 1px solid ${G.border}; background: ${G.bg}; color: ${G.muted}; transition: all 0.15s; }
//   .chip.active { background: ${G.accentSoft}; border-color: ${G.accentBrd}; color: ${G.ink}; }

//   .img-preview { width: 100%; height: 140px; object-fit: cover; border-radius: 10px; border: 1px solid ${G.border}; background: ${G.bg}; display: flex; align-items: center; justify-content: center; color: ${G.muted}; font-size: 13px; margin-bottom: 4px; overflow: hidden; }
//   .img-preview img { width: 100%; height: 100%; object-fit: cover; }
// `;

// // ─────────────────────────────────────────────────────────────
// // HELPERS
// // ─────────────────────────────────────────────────────────────
// const Icon = ({ name }) => <span className="nav-icon">{name}</span>;
// const Spinner = () => <div className="spinner" />;
// const Loading = ({ text = "Loading…" }) => <div className="loading"><Spinner />{text}</div>;
// const Err = ({ msg }) => msg ? <div className="error-banner">⚠ {msg}</div> : null;
// const fmtDate = d => d ? new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";
// const fmtDateTime = d => d ? new Date(d).toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "—";
// const initials = name => name ? name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) : "?";

// function Toggle({ checked, onChange }) {
//   return (
//     <label className="toggle">
//       <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)} />
//       <span className="toggle-slider" />
//     </label>
//   );
// }

// // ─────────────────────────────────────────────────────────────
// // LOGIN
// // ─────────────────────────────────────────────────────────────
// function LoginPage({ onLogin }) {
//   const [email, setEmail] = useState("");
//   const [pass, setPass] = useState("");
//   const [err, setErr] = useState("");
//   const [loading, setLoading] = useState(false);

//   const submit = async e => {
//     e.preventDefault();
//     setLoading(true); setErr("");
//     try {
//       const res = await api("/v2/auth/login_email", {
//         method: "POST",
//         body: JSON.stringify({ email, password: pass }),
//       });
//       onLogin(res.access_token, { email });
//     } catch (e) {
//       setErr(e.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-card">
//         <div className="login-logo">
//           <div className="login-logo-name">DOM</div>
//           <div className="login-logo-sub">Admin Dashboard</div>
//         </div>
//         <Err msg={err} />
//         <form className="login-form" onSubmit={submit}>
//           <div className="form-group">
//             <label className="form-label">Email</label>
//             <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@domapp.com" required />
//           </div>
//           <div className="form-group">
//             <label className="form-label">Password</label>
//             <input className="form-input" type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" required />
//           </div>
//           <button className="login-btn" type="submit" disabled={loading}>
//             {loading ? "Signing in…" : "Sign In →"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────
// // DASHBOARD
// // ─────────────────────────────────────────────────────────────
// function Dashboard({ token }) {
//   const [stats, setStats] = useState({ users: null, products: null, events: null, activeUsers: null });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     Promise.all([
//       api("/v2/admin/users?limit=1&skip=0", {}, token).catch(() => null),
//       api("/marketplace/products?limit=1", {}, token).catch(() => null),
//       api("/schedule/events", {}, token).catch(() => null),
//       api("/v2/admin/users?limit=100&status=active", {}, token).catch(() => null),
//     ]).then(([users, products, events, active]) => {
//       setStats({
//         users:       Array.isArray(users) ? users.length : "—",
//         products:    Array.isArray(products) ? products.length : "—",
//         events:      Array.isArray(events) ? events.length : "—",
//         activeUsers: Array.isArray(active) ? active.length : "—",
//       });
//       setLoading(false);
//     });
//   }, [token]);

//   const cards = [
//     { icon: "👥", label: "Total Users",     num: stats.users,       color: G.accentSoft,   iconBg: G.accentBrd },
//     { icon: "✅", label: "Active Users",    num: stats.activeUsers,  color: G.successSoft,  iconBg: "rgba(46,125,50,0.2)" },
//     { icon: "🛍️", label: "Products",        num: stats.products,     color: "#EFF6FF",      iconBg: "#BFDBFE" },
//     { icon: "📅", label: "Events",          num: stats.events,       color: "#FFF7ED",      iconBg: "#FED7AA" },
//   ];

//   return (
//     <div>
//       <div className="section-header">
//         <div>
//           <div className="section-title">Dashboard</div>
//           <div className="section-subtitle">Welcome to DOM Admin. Here's what's happening.</div>
//         </div>
//       </div>

//       <div className="stats-grid">
//         {cards.map(c => (
//           <div key={c.label} className="stat-card">
//             <div className="stat-icon" style={{ background: c.color }}>
//               <span style={{ fontSize: 20 }}>{c.icon}</span>
//             </div>
//             <div className="stat-num">{loading ? "—" : c.num}</div>
//             <div className="stat-label">{c.label}</div>
//           </div>
//         ))}
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
//         <div className="card">
//           <div className="card-title" style={{ marginBottom: 12 }}>Quick Actions</div>
//           <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//             {[
//               ["👤 Create new user", () => {}],
//               ["📦 Add product", () => {}],
//               ["📅 Schedule event", () => {}],
//               ["💬 Create group", () => {}],
//             ].map(([label]) => (
//               <button key={label} className="btn btn-ghost" style={{ justifyContent: "flex-start", width: "100%" }}>
//                 {label}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="card">
//           <div className="card-title" style={{ marginBottom: 12 }}>System Status</div>
//           {[
//             ["API Server", true],
//             ["LLM Provider", true],
//             ["TTS (Silero)", true],
//             ["Yandex STT", true],
//           ].map(([name, ok]) => (
//             <div key={name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${G.border}` }}>
//               <span style={{ fontSize: 13, fontWeight: 500 }}>{name}</span>
//               <span className={`badge ${ok ? "badge-active" : "badge-disabled"}`}>{ok ? "Online" : "Offline"}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────
// // USERS
// // ─────────────────────────────────────────────────────────────
// function Users({ token }) {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");
//   const [search, setSearch] = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [modal, setModal] = useState(null); // null | "create" | user object
//   const [form, setForm] = useState({});
//   const [saving, setSaving] = useState(false);
//   const [formErr, setFormErr] = useState("");

//   const load = async () => {
//     setLoading(true); setErr("");
//     try {
//       const params = new URLSearchParams({ limit: 100, skip: 0 });
//       if (roleFilter !== "all") params.set("role", roleFilter);
//       if (statusFilter !== "all") params.set("status", statusFilter);
//       const data = await api(`/v2/admin/users?${params}`, {}, token);
//       setUsers(data || []);
//     } catch (e) { setErr(e.message); }
//     finally { setLoading(false); }
//   };

//   useEffect(() => { load(); }, [roleFilter, statusFilter]);

//   const filtered = users.filter(u => {
//     if (!search) return true;
//     const q = search.toLowerCase();
//     return (u.email || "").toLowerCase().includes(q) || (u.display_name || "").toLowerCase().includes(q);
//   });

//   const openCreate = () => { setForm({ email: "", password: "", display_name: "", role: "staff", status: "active" }); setFormErr(""); setModal("create"); };
//   const openEdit = u => { setForm({ role: u.role, status: u.status, display_name: u.display_name || "" }); setFormErr(""); setModal(u); };

//   const save = async () => {
//     setSaving(true); setFormErr("");
//     try {
//       if (modal === "create") {
//         const u = await api("/v2/admin/users", { method: "POST", body: JSON.stringify(form) }, token);
//         setUsers(prev => [u, ...prev]);
//       } else {
//         const u = await api(`/v2/admin/users/${modal.id}`, { method: "PATCH", body: JSON.stringify({ role: form.role, status: form.status, display_name: form.display_name }) }, token);
//         setUsers(prev => prev.map(x => x.id === u.id ? u : x));
//       }
//       setModal(null);
//     } catch (e) { setFormErr(e.message); }
//     finally { setSaving(false); }
//   };

//   const quickToggle = async (user, field, val) => {
//     try {
//       const u = await api(`/v2/admin/users/${user.id}`, { method: "PATCH", body: JSON.stringify({ [field]: val }) }, token);
//       setUsers(prev => prev.map(x => x.id === u.id ? u : x));
//     } catch (e) { setErr(e.message); }
//   };

//   return (
//     <div>
//       <div className="section-header">
//         <div>
//           <div className="section-title">Users</div>
//           <div className="section-subtitle">{users.length} total · Manage accounts, roles and access</div>
//         </div>
//         <button className="btn btn-primary" onClick={openCreate}>+ New User</button>
//       </div>

//       <Err msg={err} />

//       <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
//         <div className="search-bar" style={{ flex: 1, minWidth: 200 }}>
//           <span>🔍</span>
//           <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email…" />
//         </div>
//         <div className="chips">
//           {["all", "admin", "staff", "guest"].map(r => (
//             <div key={r} className={`chip ${roleFilter === r ? "active" : ""}`} onClick={() => setRoleFilter(r)}>
//               {r.charAt(0).toUpperCase() + r.slice(1)}
//             </div>
//           ))}
//         </div>
//         <div className="chips">
//           {["all", "active", "disabled"].map(s => (
//             <div key={s} className={`chip ${statusFilter === s ? "active" : ""}`} onClick={() => setStatusFilter(s)}>
//               {s.charAt(0).toUpperCase() + s.slice(1)}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="card" style={{ padding: 0 }}>
//         {loading ? <Loading /> : (
//           <div className="table-wrap">
//             <table>
//               <thead>
//                 <tr>
//                   <th>User</th><th>Role</th><th>Status</th><th>Joined</th><th>Last Active</th><th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map(u => (
//                   <tr key={u.id}>
//                     <td>
//                       <div className="flex items-center gap-2">
//                         <div className="avatar">{initials(u.display_name || u.email)}</div>
//                         <div>
//                           <div style={{ fontWeight: 600, fontSize: 13 }}>{u.display_name || "—"}</div>
//                           <div style={{ fontSize: 11, color: G.muted }}>{u.email}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td><span className={`badge badge-${u.role}`}>{u.role}</span></td>
//                     <td>
//                       <Toggle checked={u.status === "active"} onChange={v => quickToggle(u, "status", v ? "active" : "disabled")} />
//                     </td>
//                     <td style={{ color: G.muted, fontSize: 12 }}>{fmtDate(u.created_at)}</td>
//                     <td style={{ color: G.muted, fontSize: 12 }}>{fmtDate(u.last_active)}</td>
//                     <td>
//                       <button className="btn btn-secondary btn-sm" onClick={() => openEdit(u)}>Edit</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             {filtered.length === 0 && <div className="empty-state"><div className="empty-icon">👤</div>No users found.</div>}
//           </div>
//         )}
//       </div>

//       {modal && (
//         <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
//           <div className="modal">
//             <div className="modal-header">
//               <div className="modal-title">{modal === "create" ? "Create User" : "Edit User"}</div>
//               <button className="modal-close" onClick={() => setModal(null)}>✕</button>
//             </div>
//             <Err msg={formErr} />
//             <div className="form-grid">
//               {modal === "create" && <>
//                 <div className="form-group">
//                   <label className="form-label">Email *</label>
//                   <input className="form-input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="user@example.com" />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Password *</label>
//                   <input className="form-input" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Min 8 characters" />
//                 </div>
//               </>}
//               <div className="form-group">
//                 <label className="form-label">Display Name</label>
//                 <input className="form-input" value={form.display_name} onChange={e => setForm(f => ({ ...f, display_name: e.target.value }))} placeholder="Name shown to users" />
//               </div>
//               <div className="form-grid form-grid-2">
//                 <div className="form-group">
//                   <label className="form-label">Role</label>
//                   <select className="form-input form-select" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
//                     <option value="guest">Guest</option>
//                     <option value="staff">Staff</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Status</label>
//                   <select className="form-input form-select" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
//                     <option value="active">Active</option>
//                     <option value="disabled">Disabled</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button className="btn btn-ghost" onClick={() => setModal(null)}>Cancel</button>
//               <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? "Saving…" : modal === "create" ? "Create User" : "Save Changes"}</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────
// // MARKETPLACE
// // ─────────────────────────────────────────────────────────────
// const EMPTY_PRODUCT = { title_en: "", title_ru: "", description_en: "", description_ru: "", price: "", image_url: "", category: "tea" };

// function Marketplace({ token }) {
//   const [products, setProducts] = useState([]);
//   const [cats, setCats] = useState(["tea", "honey", "sets", "accessories"]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");
//   const [search, setSearch] = useState("");
//   const [catFilter, setCatFilter] = useState("all");
//   const [modal, setModal] = useState(null);
//   const [form, setForm] = useState(EMPTY_PRODUCT);
//   const [saving, setSaving] = useState(false);
//   const [formErr, setFormErr] = useState("");

//   const load = async () => {
//     setLoading(true);
//     try {
//       const [prods, categories] = await Promise.all([
//         api("/marketplace/products?sort=new&limit=100", {}, token),
//         api("/marketplace/categories", {}, token),
//       ]);
//       setProducts(prods || []);
//       if (Array.isArray(categories) && categories.length) setCats(categories);
//     } catch (e) { setErr(e.message); }
//     finally { setLoading(false); }
//   };
//   useEffect(() => { load(); }, []);

//   const filtered = products.filter(p => {
//     const catOk = catFilter === "all" || p.category === catFilter;
//     const q = search.toLowerCase();
//     return catOk && (!q || p.title_en.toLowerCase().includes(q) || p.title_ru.toLowerCase().includes(q));
//   });

//   const openCreate = () => { setForm({ ...EMPTY_PRODUCT, category: cats[0] || "tea" }); setFormErr(""); setModal("create"); };
//   const openEdit = p => { setForm({ title_en: p.title_en, title_ru: p.title_ru, description_en: p.description_en || "", description_ru: p.description_ru || "", price: String(p.price), image_url: p.image_url || "", category: p.category, is_active: p.is_active }); setFormErr(""); setModal(p); };

//   const save = async () => {
//     if (!form.title_en || !form.title_ru || !form.price) { setFormErr("Title (EN), Title (RU) and Price are required."); return; }
//     setSaving(true); setFormErr("");
//     try {
//       const body = { title_en: form.title_en, title_ru: form.title_ru, description_en: form.description_en || null, description_ru: form.description_ru || null, price: parseFloat(form.price), image_url: form.image_url || null, category: form.category };
//       if (modal !== "create") body.is_active = form.is_active;
//       if (modal === "create") {
//         const p = await api("/marketplace/admin/products", { method: "POST", body: JSON.stringify(body) }, token);
//         setProducts(prev => [p, ...prev]);
//       } else {
//         const p = await api(`/marketplace/admin/products/${modal.id}`, { method: "PUT", body: JSON.stringify(body) }, token);
//         setProducts(prev => prev.map(x => x.id === p.id ? p : x));
//       }
//       setModal(null);
//     } catch (e) { setFormErr(e.message); }
//     finally { setSaving(false); }
//   };

//   const del = async p => {
//     if (!confirm(`Delete "${p.title_en}"?`)) return;
//     try {
//       await api(`/marketplace/admin/products/${p.id}`, { method: "DELETE" }, token).catch(e => {
//         if (!e.message.includes("JSON") && !e.message.includes("parse")) throw e;
//       });
//       setProducts(prev => prev.filter(x => x.id !== p.id));
//     } catch (e) { setErr(e.message); }
//   };

//   const toggleActive = async p => {
//     try {
//       const updated = await api(`/marketplace/admin/products/${p.id}`, { method: "PUT", body: JSON.stringify({ is_active: !p.is_active }) }, token);
//       setProducts(prev => prev.map(x => x.id === updated.id ? updated : x));
//     } catch (e) { setErr(e.message); }
//   };

//   const activeCount = products.filter(p => p.is_active).length;

//   return (
//     <div>
//       <div className="section-header">
//         <div>
//           <div className="section-title">Marketplace</div>
//           <div className="section-subtitle">{products.length} products · {activeCount} active</div>
//         </div>
//         <button className="btn btn-primary" onClick={openCreate}>+ Add Product</button>
//       </div>

//       <Err msg={err} />

//       <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
//         <div className="search-bar" style={{ flex: 1, minWidth: 200 }}>
//           <span>🔍</span>
//           <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…" />
//         </div>
//         <div className="chips">
//           {["all", ...cats].map(c => (
//             <div key={c} className={`chip ${catFilter === c ? "active" : ""}`} onClick={() => setCatFilter(c)}>
//               {c === "all" ? "All" : c}
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="card" style={{ padding: 0 }}>
//         {loading ? <Loading /> : (
//           <div className="table-wrap">
//             <table>
//               <thead>
//                 <tr><th>Product</th><th>Category</th><th>Price</th><th>Visible</th><th>Updated</th><th>Actions</th></tr>
//               </thead>
//               <tbody>
//                 {filtered.map(p => (
//                   <tr key={p.id}>
//                     <td>
//                       <div className="flex items-center gap-2">
//                         {p.image_url ? <img className="thumb" src={p.image_url} alt="" onError={e => e.target.style.display = "none"} /> : <div className="thumb" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>🖼</div>}
//                         <div>
//                           <div style={{ fontWeight: 600, fontSize: 13 }}>{p.title_en}</div>
//                           <div style={{ fontSize: 11, color: G.muted }}>{p.title_ru}</div>
//                         </div>
//                       </div>
//                     </td>
//                     <td><span className="badge badge-staff">{p.category}</span></td>
//                     <td style={{ fontWeight: 700, color: G.accent }}>${p.price.toFixed(2)}</td>
//                     <td><Toggle checked={p.is_active} onChange={() => toggleActive(p)} /></td>
//                     <td style={{ fontSize: 12, color: G.muted }}>{fmtDate(p.updated_at)}</td>
//                     <td>
//                       <div className="flex gap-2">
//                         <button className="btn btn-secondary btn-sm" onClick={() => openEdit(p)}>Edit</button>
//                         <button className="btn btn-danger btn-sm" onClick={() => del(p)}>Delete</button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             {filtered.length === 0 && <div className="empty-state"><div className="empty-icon">📦</div>No products found.</div>}
//           </div>
//         )}
//       </div>

//       {modal && (
//         <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
//           <div className="modal modal-wide">
//             <div className="modal-header">
//               <div className="modal-title">{modal === "create" ? "Add Product" : "Edit Product"}</div>
//               <button className="modal-close" onClick={() => setModal(null)}>✕</button>
//             </div>
//             <Err msg={formErr} />

//             {form.image_url && (
//               <div className="img-preview" style={{ marginBottom: 16 }}>
//                 <img src={form.image_url} alt="" onError={e => e.target.style.display = "none"} />
//               </div>
//             )}

//             <div className="form-grid">
//               <div className="form-group">
//                 <label className="form-label">Image URL</label>
//                 <input className="form-input" value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://…" />
//               </div>
//               <div className="form-grid form-grid-2">
//                 <div className="form-group">
//                   <label className="form-label">Title (English) *</label>
//                   <input className="form-input" value={form.title_en} onChange={e => setForm(f => ({ ...f, title_en: e.target.value }))} placeholder="e.g. Jasmine Tea" />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Title (Russian) *</label>
//                   <input className="form-input" value={form.title_ru} onChange={e => setForm(f => ({ ...f, title_ru: e.target.value }))} placeholder="Жасминовый чай" />
//                 </div>
//               </div>
//               <div className="form-grid form-grid-2">
//                 <div className="form-group">
//                   <label className="form-label">Description (EN)</label>
//                   <textarea className="form-input form-textarea" value={form.description_en} onChange={e => setForm(f => ({ ...f, description_en: e.target.value }))} placeholder="English description…" />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Description (RU)</label>
//                   <textarea className="form-input form-textarea" value={form.description_ru} onChange={e => setForm(f => ({ ...f, description_ru: e.target.value }))} placeholder="Описание на русском…" />
//                 </div>
//               </div>
//               <div className="form-grid form-grid-2">
//                 <div className="form-group">
//                   <label className="form-label">Price (USD) *</label>
//                   <input className="form-input" type="number" min="0" step="0.01" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} placeholder="24.99" />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Category *</label>
//                   <select className="form-input form-select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
//                     {cats.map(c => <option key={c} value={c}>{c}</option>)}
//                   </select>
//                 </div>
//               </div>
//               {modal !== "create" && (
//                 <div className="form-group">
//                   <label className="form-label">Visibility</label>
//                   <div className="flex items-center gap-2" style={{ paddingTop: 4 }}>
//                     <Toggle checked={form.is_active} onChange={v => setForm(f => ({ ...f, is_active: v }))} />
//                     <span style={{ fontSize: 13, color: G.muted }}>{form.is_active ? "Visible to users" : "Hidden from users"}</span>
//                   </div>
//                 </div>
//               )}
//             </div>
//             <div className="modal-footer">
//               <button className="btn btn-ghost" onClick={() => setModal(null)}>Cancel</button>
//               <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? "Saving…" : modal === "create" ? "Add Product" : "Save Changes"}</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────
// // EVENTS
// // ─────────────────────────────────────────────────────────────
// const EMPTY_EVENT = { title_en: "", title_ru: "", description_en: "", description_ru: "", start_time: "", end_time: "", capacity: "20", kind: "" };

// function Events({ token }) {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");
//   const [modal, setModal] = useState(null);
//   const [form, setForm] = useState(EMPTY_EVENT);
//   const [saving, setSaving] = useState(false);
//   const [formErr, setFormErr] = useState("");

//   const load = async () => {
//     setLoading(true);
//     try {
//       // Get next 60 days of events
//       const start = new Date().toISOString().split("T")[0];
//       const end = new Date(Date.now() + 60 * 86400000).toISOString().split("T")[0];
//       const data = await api(`/schedule/events?start=${start}&end=${end}`, {}, token);
//       setEvents(data || []);
//     } catch (e) { setErr(e.message); }
//     finally { setLoading(false); }
//   };
//   useEffect(() => { load(); }, []);

//   const toInputDT = iso => iso ? new Date(iso).toISOString().slice(0, 16) : "";
//   const fromInputDT = s => s ? new Date(s).toISOString() : "";

//   const openCreate = () => { setForm(EMPTY_EVENT); setFormErr(""); setModal("create"); };
//   const openEdit = ev => {
//     setForm({ title_en: ev.title_en, title_ru: ev.title_ru, description_en: ev.description_en || "", description_ru: ev.description_ru || "", start_time: toInputDT(ev.start_time), end_time: toInputDT(ev.end_time), capacity: String(ev.capacity), kind: ev.kind || "" });
//     setFormErr(""); setModal(ev);
//   };

//   const save = async () => {
//     if (!form.title_en || !form.title_ru || !form.start_time || !form.end_time) { setFormErr("Title (EN/RU), start and end times are required."); return; }
//     setSaving(true); setFormErr("");
//     try {
//       const body = { title_en: form.title_en, title_ru: form.title_ru, description_en: form.description_en || "", description_ru: form.description_ru || "", start_time: fromInputDT(form.start_time), end_time: fromInputDT(form.end_time), capacity: parseInt(form.capacity) || 20, kind: form.kind || "" };
//       if (modal === "create") {
//         const ev = await api("/schedule/admin/events", { method: "POST", body: JSON.stringify(body) }, token);
//         setEvents(prev => [...prev, ev].sort((a, b) => new Date(a.start_time) - new Date(b.start_time)));
//       } else {
//         const ev = await api(`/schedule/admin/events/${modal.id}`, { method: "PUT", body: JSON.stringify(body) }, token);
//         setEvents(prev => prev.map(x => x.id === ev.id ? ev : x));
//       }
//       setModal(null);
//     } catch (e) { setFormErr(e.message); }
//     finally { setSaving(false); }
//   };

//   const del = async ev => {
//     if (!confirm(`Delete "${ev.title_en}"?`)) return;
//     try {
//       await api(`/schedule/admin/events/${ev.id}`, { method: "DELETE" }, token).catch(e => {
//         if (!e.message.includes("JSON") && !e.message.includes("parse")) throw e;
//       });
//       setEvents(prev => prev.filter(x => x.id !== ev.id));
//     } catch (e) { setErr(e.message); }
//   };

//   return (
//     <div>
//       <div className="section-header">
//         <div>
//           <div className="section-title">Events & Schedule</div>
//           <div className="section-subtitle">{events.length} upcoming events</div>
//         </div>
//         <button className="btn btn-primary" onClick={openCreate}>+ New Event</button>
//       </div>

//       <Err msg={err} />

//       <div className="card" style={{ padding: 0 }}>
//         {loading ? <Loading /> : (
//           <div className="table-wrap">
//             <table>
//               <thead>
//                 <tr><th>Event</th><th>Type</th><th>Start</th><th>End</th><th>Capacity</th><th>Spots Left</th><th>Actions</th></tr>
//               </thead>
//               <tbody>
//                 {events.map(ev => (
//                   <tr key={ev.id}>
//                     <td>
//                       <div style={{ fontWeight: 600, fontSize: 13 }}>{ev.title_en}</div>
//                       <div style={{ fontSize: 11, color: G.muted }}>{ev.title_ru}</div>
//                     </td>
//                     <td><span className="badge badge-staff">{ev.kind || "General"}</span></td>
//                     <td style={{ fontSize: 12 }}>{fmtDateTime(ev.start_time)}</td>
//                     <td style={{ fontSize: 12 }}>{fmtDateTime(ev.end_time)}</td>
//                     <td style={{ textAlign: "center" }}>{ev.capacity}</td>
//                     <td>
//                       <span className={`badge ${ev.spots_left > 0 ? "badge-active" : "badge-disabled"}`}>
//                         {ev.spots_left > 0 ? `${ev.spots_left} left` : "Full"}
//                       </span>
//                     </td>
//                     <td>
//                       <div className="flex gap-2">
//                         <button className="btn btn-secondary btn-sm" onClick={() => openEdit(ev)}>Edit</button>
//                         <button className="btn btn-danger btn-sm" onClick={() => del(ev)}>Delete</button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             {events.length === 0 && <div className="empty-state"><div className="empty-icon">📅</div>No events scheduled.</div>}
//           </div>
//         )}
//       </div>

//       {modal && (
//         <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(null)}>
//           <div className="modal modal-wide">
//             <div className="modal-header">
//               <div className="modal-title">{modal === "create" ? "New Event" : "Edit Event"}</div>
//               <button className="modal-close" onClick={() => setModal(null)}>✕</button>
//             </div>
//             <Err msg={formErr} />
//             <div className="form-grid">
//               <div className="form-grid form-grid-2">
//                 <div className="form-group"><label className="form-label">Title (EN) *</label><input className="form-input" value={form.title_en} onChange={e => setForm(f => ({ ...f, title_en: e.target.value }))} placeholder="Event name in English" /></div>
//                 <div className="form-group"><label className="form-label">Title (RU) *</label><input className="form-input" value={form.title_ru} onChange={e => setForm(f => ({ ...f, title_ru: e.target.value }))} placeholder="Название события" /></div>
//               </div>
//               <div className="form-grid form-grid-2">
//                 <div className="form-group"><label className="form-label">Description (EN)</label><textarea className="form-input form-textarea" value={form.description_en} onChange={e => setForm(f => ({ ...f, description_en: e.target.value }))} /></div>
//                 <div className="form-group"><label className="form-label">Description (RU)</label><textarea className="form-input form-textarea" value={form.description_ru} onChange={e => setForm(f => ({ ...f, description_ru: e.target.value }))} /></div>
//               </div>
//               <div className="form-grid form-grid-2">
//                 <div className="form-group"><label className="form-label">Start Time *</label><input className="form-input" type="datetime-local" value={form.start_time} onChange={e => setForm(f => ({ ...f, start_time: e.target.value }))} /></div>
//                 <div className="form-group"><label className="form-label">End Time *</label><input className="form-input" type="datetime-local" value={form.end_time} onChange={e => setForm(f => ({ ...f, end_time: e.target.value }))} /></div>
//               </div>
//               <div className="form-grid form-grid-2">
//                 <div className="form-group"><label className="form-label">Capacity</label><input className="form-input" type="number" min="1" value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))} /></div>
//                 <div className="form-group"><label className="form-label">Type / Kind</label><input className="form-input" value={form.kind} onChange={e => setForm(f => ({ ...f, kind: e.target.value }))} placeholder="e.g. ceremony, workshop…" /></div>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button className="btn btn-ghost" onClick={() => setModal(null)}>Cancel</button>
//               <button className="btn btn-primary" onClick={save} disabled={saving}>{saving ? "Saving…" : modal === "create" ? "Create Event" : "Save Changes"}</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────
// // GROUPS
// // ─────────────────────────────────────────────────────────────
// function Groups({ token }) {
//   const [threads, setThreads] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");
//   const [modal, setModal] = useState(false);
//   const [form, setForm] = useState({ title: "", description: "", member_ids: "" });
//   const [saving, setSaving] = useState(false);
//   const [formErr, setFormErr] = useState("");
//   const [memberModal, setMemberModal] = useState(null); // thread
//   const [memberId, setMemberId] = useState("");
//   const [memberSaving, setMemberSaving] = useState(false);

//   const load = async () => {
//     setLoading(true);
//     try {
//       const data = await api("/v2/threads", {}, token);
//       setThreads((data || []).filter(t => t.type === "guide" || t.type === "support" || !t.type));
//     } catch (e) { setErr(e.message); }
//     finally { setLoading(false); }
//   };
//   useEffect(() => { load(); }, []);

//   const createGroup = async () => {
//     if (!form.title.trim()) { setFormErr("Title is required."); return; }
//     setSaving(true); setFormErr("");
//     try {
//       const params = new URLSearchParams({ title: form.title });
//       if (form.description) params.set("description", form.description);
//       const memberIds = form.member_ids.split(",").map(s => s.trim()).filter(Boolean);
//       const body = memberIds.length > 0 ? memberIds : null;
//       const group = await api(`/v2/admin/groups?${params}`, { method: "POST", body: JSON.stringify(body) }, token);
//       setThreads(prev => [group, ...prev]);
//       setModal(false);
//     } catch (e) { setFormErr(e.message); }
//     finally { setSaving(false); }
//   };

//   const addMember = async () => {
//     if (!memberId.trim()) return;
//     setMemberSaving(true);
//     try {
//       await api(`/v2/admin/groups/${memberModal.id}/members`, { method: "POST", body: JSON.stringify({ user_id: memberId.trim() }) }, token);
//       setMemberId("");
//       alert("Member added successfully.");
//     } catch (e) { alert(e.message); }
//     finally { setMemberSaving(false); }
//   };

//   return (
//     <div>
//       <div className="section-header">
//         <div>
//           <div className="section-title">Groups</div>
//           <div className="section-subtitle">Manage group conversations and membership</div>
//         </div>
//         <button className="btn btn-primary" onClick={() => { setForm({ title: "", description: "", member_ids: "" }); setFormErr(""); setModal(true); }}>+ Create Group</button>
//       </div>

//       <Err msg={err} />

//       <div className="card" style={{ padding: 0 }}>
//         {loading ? <Loading /> : (
//           <div className="table-wrap">
//             <table>
//               <thead>
//                 <tr><th>Group</th><th>Type</th><th>Created</th><th>Actions</th></tr>
//               </thead>
//               <tbody>
//                 {threads.map(t => (
//                   <tr key={t.id}>
//                     <td>
//                       <div style={{ fontWeight: 600, fontSize: 13 }}>{t.title || "(Untitled)"}</div>
//                       <div style={{ fontSize: 10, color: G.muted, fontFamily: "monospace" }}>{t.id}</div>
//                     </td>
//                     <td><span className="badge badge-staff">{t.type}</span></td>
//                     <td style={{ fontSize: 12, color: G.muted }}>{fmtDate(t.created_at)}</td>
//                     <td>
//                       <button className="btn btn-secondary btn-sm" onClick={() => { setMemberId(""); setMemberModal(t); }}>Manage Members</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             {threads.length === 0 && <div className="empty-state"><div className="empty-icon">💬</div>No groups found.</div>}
//           </div>
//         )}
//       </div>

//       {modal && (
//         <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
//           <div className="modal">
//             <div className="modal-header">
//               <div className="modal-title">Create Group</div>
//               <button className="modal-close" onClick={() => setModal(false)}>✕</button>
//             </div>
//             <Err msg={formErr} />
//             <div className="form-grid">
//               <div className="form-group"><label className="form-label">Group Name *</label><input className="form-input" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Morning Tea Circle" /></div>
//               <div className="form-group"><label className="form-label">Description</label><input className="form-input" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="What is this group for?" /></div>
//               <div className="form-group">
//                 <label className="form-label">Initial Members (User IDs)</label>
//                 <textarea className="form-input form-textarea" value={form.member_ids} onChange={e => setForm(f => ({ ...f, member_ids: e.target.value }))} placeholder="Comma-separated UUIDs, e.g. abc-123, def-456" />
//                 <span style={{ fontSize: 11, color: G.muted }}>Leave blank to create an empty group</span>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button className="btn btn-ghost" onClick={() => setModal(false)}>Cancel</button>
//               <button className="btn btn-primary" onClick={createGroup} disabled={saving}>{saving ? "Creating…" : "Create Group"}</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {memberModal && (
//         <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setMemberModal(null)}>
//           <div className="modal">
//             <div className="modal-header">
//               <div className="modal-title">Manage Members</div>
//               <button className="modal-close" onClick={() => setMemberModal(null)}>✕</button>
//             </div>
//             <div style={{ marginBottom: 16, padding: "12px 14px", background: G.bg, borderRadius: 10, fontSize: 12, color: G.muted }}>
//               Group: <strong style={{ color: G.ink }}>{memberModal.title}</strong>
//             </div>
//             <div className="form-group" style={{ marginBottom: 12 }}>
//               <label className="form-label">Add Member by User ID</label>
//               <div className="flex gap-2">
//                 <input className="form-input" style={{ flex: 1 }} value={memberId} onChange={e => setMemberId(e.target.value)} placeholder="User UUID" />
//                 <button className="btn btn-primary" onClick={addMember} disabled={memberSaving}>{memberSaving ? "…" : "Add"}</button>
//               </div>
//             </div>
//             <div style={{ fontSize: 12, color: G.muted, padding: "10px 0" }}>
//               To remove a member, use: <code style={{ background: G.bg, padding: "2px 6px", borderRadius: 4 }}>DELETE /v2/admin/groups/{"{thread_id}"}/members/{"{user_id}"}</code>
//             </div>
//             <div className="modal-footer">
//               <button className="btn btn-ghost" onClick={() => setMemberModal(null)}>Close</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────
// // MEMORY (Semantic)
// // ─────────────────────────────────────────────────────────────
// function Memory({ token }) {
//   const [userId, setUserId] = useState("");
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");
//   const [deleting, setDeleting] = useState(null);

//   const search = async () => {
//     if (!userId || !query) { setErr("User ID and search query are required."); return; }
//     setLoading(true); setErr(""); setResults([]);
//     try {
//       const data = await api(`/v1/memory/semantic/search?user_id=${userId}&q=${encodeURIComponent(query)}&k=20`, {}, token);
//       setResults(data || []);
//     } catch (e) { setErr(e.message); }
//     finally { setLoading(false); }
//   };

//   const deleteParent = async parentId => {
//     if (!confirm(`Delete memory entry ${parentId}?`)) return;
//     setDeleting(parentId);
//     try {
//       await api(`/v1/memory/semantic/delete_parent/${parentId}`, { method: "DELETE" }, token).catch(e => {
//         if (!e.message.includes("JSON") && !e.message.includes("parse")) throw e;
//       });
//       setResults(prev => prev.filter(r => r.parent_id !== parentId));
//     } catch (e) { setErr(e.message); }
//     finally { setDeleting(null); }
//   };

//   return (
//     <div>
//       <div className="section-header">
//         <div>
//           <div className="section-title">User Memory</div>
//           <div className="section-subtitle">Search and manage semantic memory for users</div>
//         </div>
//       </div>

//       <div className="card" style={{ marginBottom: 16 }}>
//         <div className="form-grid form-grid-2" style={{ marginBottom: 12 }}>
//           <div className="form-group">
//             <label className="form-label">User ID (UUID)</label>
//             <input className="form-input" value={userId} onChange={e => setUserId(e.target.value)} placeholder="User UUID" />
//           </div>
//           <div className="form-group">
//             <label className="form-label">Search Query</label>
//             <input className="form-input" value={query} onChange={e => setQuery(e.target.value)} placeholder="e.g. anxiety, morning ritual…" onKeyDown={e => e.key === "Enter" && search()} />
//           </div>
//         </div>
//         <button className="btn btn-primary" onClick={search} disabled={loading}>{loading ? "Searching…" : "Search Memory"}</button>
//       </div>

//       <Err msg={err} />

//       {results.length > 0 && (
//         <div className="card" style={{ padding: 0 }}>
//           <div className="table-wrap">
//             <table>
//               <thead><tr><th>Content</th><th>Category</th><th>Score</th><th>Actions</th></tr></thead>
//               <tbody>
//                 {results.map((r, i) => (
//                   <tr key={i}>
//                     <td style={{ maxWidth: 400, fontSize: 13 }}>{r.content || r.text || JSON.stringify(r)}</td>
//                     <td><span className="badge badge-staff">{r.category || "—"}</span></td>
//                     <td>{r.score ? (r.score * 100).toFixed(1) + "%" : "—"}</td>
//                     <td>
//                       {r.parent_id && (
//                         <button className="btn btn-danger btn-sm" onClick={() => deleteParent(r.parent_id)} disabled={deleting === r.parent_id}>
//                           {deleting === r.parent_id ? "…" : "Delete"}
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//       {!loading && results.length === 0 && query && <div className="empty-state"><div className="empty-icon">🧠</div>No memory entries found.</div>}
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────
// // APP SHELL
// // ─────────────────────────────────────────────────────────────
// const NAV = [
//   { id: "dashboard",   icon: "📊", label: "Dashboard" },
//   { id: "users",       icon: "👥", label: "Users" },
//   { id: "marketplace", icon: "🛍️", label: "Marketplace" },
//   { id: "events",      icon: "📅", label: "Events" },
//   { id: "groups",      icon: "💬", label: "Groups" },
//   { id: "memory",      icon: "🧠", label: "User Memory" },
// ];

// const SECTION_TITLES = { dashboard: "Dashboard", users: "Users", marketplace: "Marketplace", events: "Events & Schedule", groups: "Groups", memory: "User Memory" };

// function AdminShell({ token, user, onLogout }) {
//   const [section, setSection] = useState("dashboard");

//   const Section = {
//     dashboard:   <Dashboard   token={token} />,
//     users:       <Users       token={token} />,
//     marketplace: <Marketplace token={token} />,
//     events:      <Events      token={token} />,
//     groups:      <Groups      token={token} />,
//     memory:      <Memory      token={token} />,
//   }[section];

//   return (
//     <div className="admin-shell">
//       <aside className="sidebar">
//         <div className="sidebar-logo">
//           <div className="sidebar-logo-kicker">DOM</div>
//           <div className="sidebar-logo-name">Admin</div>
//           <div className="sidebar-logo-sub">Control Panel</div>
//         </div>
//         <nav className="sidebar-nav">
//           <div className="nav-section-label">Main</div>
//           {NAV.map(n => (
//             <button key={n.id} className={`nav-item ${section === n.id ? "active" : ""}`} onClick={() => setSection(n.id)}>
//               <span className="nav-icon">{n.icon}</span>
//               {n.label}
//             </button>
//           ))}
//         </nav>
//         <div className="sidebar-footer">
//           <div className="sidebar-user">
//             <div className="sidebar-avatar">{initials(user?.email || "A")}</div>
//             <div className="sidebar-user-info">
//               <div className="sidebar-user-name">{user?.email || "Admin"}</div>
//               <div className="sidebar-user-role">Administrator</div>
//             </div>
//             <button className="logout-btn" onClick={onLogout} title="Sign out">⬆</button>
//           </div>
//         </div>
//       </aside>

//       <div className="main">
//         <header className="topbar">
//           <div className="topbar-title">{SECTION_TITLES[section]}</div>
//           <div className="topbar-actions">
//             <span style={{ fontSize: 12, color: G.muted }}>DOM Backend · {BASE}</span>
//           </div>
//         </header>
//         <div className="content">
//           {Section}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ─────────────────────────────────────────────────────────────
// // ROOT
// // ─────────────────────────────────────────────────────────────
// export default function App() {
//   const [token, setToken] = useState(() => sessionStorage.getItem("dom_admin_token") || null);
//   const [user, setUser]   = useState(() => { try { return JSON.parse(sessionStorage.getItem("dom_admin_user")); } catch { return null; } });

//   const handleLogin = (t, u) => {
//     sessionStorage.setItem("dom_admin_token", t);
//     sessionStorage.setItem("dom_admin_user", JSON.stringify(u));
//     setToken(t); setUser(u);
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem("dom_admin_token");
//     sessionStorage.removeItem("dom_admin_user");
//     setToken(null); setUser(null);
//   };

//   return (
//     <>
//       <style>{css}</style>
//       {token
//         ? <AdminShell token={token} user={user} onLogout={handleLogout} />
//         : <LoginPage onLogin={handleLogin} />
//       }
//     </>
//   );
// }
