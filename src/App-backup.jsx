
import { useEffect, useState, useRef } from 'react'

import {
  User,
  Archive,
  ArrowLeft,
  Bell,
  Check,
  CheckCheck,
  ChevronRight,
  CircleHelp,
  Copy,
  Crown,
  Gift,
  LockKeyhole,
  Menu,
  MessageCircle,
  MoreVertical,
  Paperclip,
  Phone,
  Pin,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Smile,
  Sparkles,
  Users,
  Wallet,
  X,
  Pencil,
  Trash2,
} from 'lucide-react'

import './App.css'

  

const initialChats = [
  {
    id: 1,
    name: 'GlassTalk Pavel',
    avatar: '💎',
    color: 'blue',
    online: true,
    unread: 2,
    time: '14:22',
    pinned: true,
    message: 'Привет! Как тебе новый интерфейс?',
    messages: [
      {
        id: 1,
        from: 'them',
        text: 'Добро пожаловать в GlassTalk! Мессенджер нового поколения.',
        time: '14:20',
      },
      {
        id: 2,
        from: 'them',
        text: 'Здесь ты можешь общаться, отправлять подарки и пользоваться GlassCoins.',
        time: '14:21',
      },
      {
        id: 3,
        from: 'me',
        text: 'Выглядит потрясающе! Как купить Premium?',
        time: '14:22',
        read: true,
      },
    ],
  },
  {
    id: 2,
    name: 'Crypto Bot',
    avatar: '🤖',
    color: 'orange',
    online: true,
    unread: 0,
    time: 'Вчера',
    pinned: false,
    message: 'Ваш баланс GlassCoins успешно пополнен',
    messages: [
      {
        id: 1,
        from: 'them',
        text: 'Добро пожаловать! Здесь будут отображаться уведомления о балансе.',
        time: '12:30',
      },
    ],
  },
  {
    id: 3,
    name: 'NFT Gifts Store',
    avatar: '🎁',
    color: 'pink',
    online: false,
    unread: 1,
    time: '12:05',
    pinned: false,
    message: 'Эксклюзивный подарок уже доступен!',
    messages: [
      {
        id: 1,
        from: 'them',
        text: 'Загляни в раздел подарков GlassTalk.',
        time: '12:05',
      },
    ],
  },
  {
    id: 4,
    name: 'Друзья',
    avatar: '👥',
    color: 'green',
    online: false,
    unread: 0,
    time: 'Пн',
    pinned: false,
    message: 'Здесь появятся твои контакты',
    messages: [
      {
        id: 1,
        from: 'them',
        text: 'Этот диалог пока демонстрационный.',
        time: '10:00',
      },
    ],
  },
]


const giftItems = [
  { id: 1, emoji: '⭐', name: 'Золотая звезда', price: 100, rarity: 'Редкий' },
  { id: 2, emoji: '💝', name: 'Жидкое сердце', price: 250, rarity: 'Эпический' },
  { id: 3, emoji: '🦆', name: 'Кибер-утка', price: 500, rarity: 'Мифический' },
  { id: 4, emoji: '💎', name: 'Кристалл', price: 1000, rarity: 'Легендарный' },
]


function Avatar({ emoji, color = 'purple', online = false }) {
  const isPhoto = typeof emoji === 'string' && emoji.startsWith('data:image/')

  return (
    <div className={`avatar avatar-${color} ${isPhoto ? 'avatar-photo' : ''}`}>
      {isPhoto ? (
        <img src={emoji} alt="Аватар" />
      ) : (
        <span>{emoji}</span>
      )}
      {online && <i className="online-dot" />}
    </div>
  )
}


function Heading({ title, subtitle, children }) {
  return (
    <header className="section-heading">
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children}
    </header>
  )
}

function InfoNote({ children }) {
  return <div className="info-note"><LockKeyhole size={16} /><span>{children}</span></div>
}

export default function App() {
  const [activeTab, setActiveTab] = useState('chats')
  const [selectedChat, setSelectedChat] = useState(1)
  const [chats, setChats] = useState(() => {
  try {
    const savedChats = localStorage.getItem('glasstalk-chats')
    return savedChats ? JSON.parse(savedChats) : initialChats
  } catch {
    return initialChats
  }
})
const messagesEndRef = useRef(null)

  const [search, setSearch] = useState('')
  const [messageText, setMessageText] = useState('')
  const [replyingTo, setReplyingTo] = useState(null)
  const [forwardingMessage, setForwardingMessage] = useState(null)
  const [balance, setBalance] = useState(2450)
  const [isPremium, setIsPremium] = useState(false)
  const [notice, setNotice] = useState('')
  const [mobileChatOpen, setMobileChatOpen] = useState(false)
  const [mobileChatClosing, setMobileChatClosing] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  useEffect(() => {
  try {
    localStorage.setItem('glasstalk-chats', JSON.stringify(chats))
  } catch (error) {
    console.error('Не удалось сохранить переписки:', error)
  }
}, [chats])





  
const [profile, setProfile] = useState(() => {
  const defaultProfile = {
    name: 'GlassTalk User',
    username: 'glasstalk_user',
    bio: 'Всем привет! Я пользуюсь GlassTalk 💜',
    avatar: '💎',
    status: 'online',
    customStatus: '✨ Всегда на связи',
  }

  try {
    const savedProfile = JSON.parse(
      localStorage.getItem('glasstalk-profile')
    )

    return {
      ...defaultProfile,
      ...(savedProfile || {}),
      status: savedProfile?.status || defaultProfile.status,
      customStatus:
        savedProfile?.customStatus ?? defaultProfile.customStatus,
    }
  } catch {
    return defaultProfile
  }
})

  const [profileEditing, setProfileEditing] = useState(false)
  const [profileDraft, setProfileDraft] = useState(profile)
  const [darkTheme, setDarkTheme] = useState(true)


  const [menu, setMenu] = useState(null)
  const [editing, setEditing] = useState(null)
  const [editText, setEditText] = useState('')

  const currentChat = chats.find((chat) => chat.id === selectedChat) || chats[0]
  const filteredChats = chats
    .filter((chat) => `${chat.name} ${chat.message}`.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => Number(Boolean(b.pinned)) - Number(Boolean(a.pinned)))

  function notify(text) {
    setNotice(text)
    window.setTimeout(() => setNotice(''), 2600)
  }

  function saveProfile(event) {
    event.preventDefault()

    const nextProfile = {
      ...profileDraft,
      name: profileDraft.name.trim() || 'GlassTalk User',
      username: profileDraft.username.trim().replace(/^@+/, '').replace(/\s/g, '') || 'glasstalk_user',
      bio: profileDraft.bio.trim(),
    }

    setProfile(nextProfile)
    localStorage.setItem('glasstalk-profile', JSON.stringify(nextProfile))
    setProfileEditing(false)
    notify('Профиль сохранён')
  }


  function updateChat(chatId, updater) {
    setChats((prev) => prev.map((chat) => chat.id === chatId ? updater(chat) : chat))
  }

  function openChat(chat) {
    setSelectedChat(chat.id)
    setMobileChatOpen(true)
    setActiveTab('chats')
    updateChat(chat.id, (item) => ({ ...item, unread: 0 }))
    setMenu(null)
  }

  function sendMessage(event) {
    event.preventDefault()
    const text = messageText.trim()
    if (!text) return

    const time = new Date().toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    })

    updateChat(selectedChat, (chat) => ({
      ...chat,
      message: text,
      time,
      messages: [
        ...chat.messages,
        {
          id: Date.now(),
          from: 'me',
          text,
          time,
          read: false,
          isNew: true,
          replyTo: replyingTo
            ? {
              id: replyingTo.id,
              text: replyingTo.text,
              from: replyingTo.from,
            }
            : null,
        },
      ],
    }))

    setMessageText('')
    setReplyingTo(null)
  }


function togglePin(chatId) {
  updateChat(chatId, (chat) => ({ ...chat, pinned: !chat.pinned }))
  setMenu(null)
  notify('Закрепление чата обновлено')
}

function markUnread(chatId) {
  updateChat(chatId, (chat) => ({ ...chat, unread: Math.max(1, chat.unread) }))
  setMenu(null)
  notify('Чат отмечен как непрочитанный')
}

function deleteMessage(messageId) {
  updateChat(selectedChat, (chat) => {
    const messages = chat.messages.filter((message) => message.id !== messageId)
    return {
      ...chat,
      messages,
      message: messages.length ? messages[messages.length - 1].text : 'Нет сообщений',
    }
  })
  setMenu(null)
  setEditing(null)
  notify('Сообщение удалено из локальной истории')
}

function saveEdit(messageId) {
  const text = editText.trim()
  if (!text) return
  updateChat(selectedChat, (chat) => {
    const messages = chat.messages.map((message) =>
      message.id === messageId ? { ...message, text, edited: true } : message,
    )
    return {
      ...chat,
      messages,
      message: messages.length ? messages[messages.length - 1].text : 'Нет сообщений',
    }
  })
  setEditing(null)
  setEditText('')
  setMenu(null)
  notify('Сообщение изменено')
}


function toggleReaction(messageId, emoji = '👍') {
  updateChat(selectedChat, (chat) => ({
    ...chat,
    messages: chat.messages.map((message) => {
      if (message.id !== messageId) return message

      const reactions = message.reactions || []
      const alreadyReacted = reactions.includes(emoji)

      return {
        ...message,
        reactions: alreadyReacted
          ? reactions.filter((item) => item !== emoji)
          : [...reactions, emoji],
        liked: emoji === '👍' ? !alreadyReacted : message.liked,
      }
    }),
  }))
  setMenu(null)
}


async function copyMessage(text) {
  try {
    
    

    notify('Текст скопирован')
  } catch {
    notify('Не удалось скопировать. Выдели текст вручную.')
  }
  setMenu(null)
}

function buyGift(gift) {
  if (balance < gift.price) {
    notify('Недостаточно GlassCoins')
    return
  }
  setBalance((value) => value - gift.price)
  notify(`«${gift.name}» получен в деморежиме`)
}

const nav = [
  { id: 'profile', label: 'Мой профиль', icon: User },
  { id: 'chats', label: 'Чаты', icon: MessageCircle },
  { id: 'contacts', label: 'Контакты', icon: Users },
  { id: 'archive', label: 'Архив', icon: Archive },
  { id: 'wallet', label: 'GlassCoins', icon: Wallet },
  { id: 'gifts', label: 'Подарки', icon: Gift },
  { id: 'premium', label: 'Premium', icon: Crown },
  { id: 'admin', label: 'Владелец', icon: ShieldCheck },
  { id: 'settings', label: 'Настройки', icon: Settings },
]

function renderPage() {
  if (activeTab === 'contacts') return (
    <section className="page-panel">
      <Heading title="Контакты" subtitle="Люди, с которыми ты общаешься">
        <button className="primary-button" onClick={() => notify('Добавление контактов требует серверной части')}><Plus size={17} /> Добавить</button>
      </Heading>
      <div className="page-card contact-card">
        <Avatar emoji="💎" color="blue" online />
        <div><strong>GlassTalk Pavel</strong><span>в сети</span></div>
        <button className="secondary-button" onClick={() => openChat(chats[0])}>Написать</button>
      </div>
      <InfoNote>Контакты демонстрационные. Для поиска реальных пользователей понадобятся сервер и аккаунты.</InfoNote>
    </section>
  )

  if (activeTab === 'profile') return (
    <section className="page-panel">
      <Heading title="Мой профиль" subtitle="Твой аккаунт GlassTalk" />

      <div className="profile-page-card">
        <div className="profile-page-top">
          <div className="profile-big-avatar">
            {profile.avatar?.startsWith('data:image/') ? (
              <img src={profile.avatar} alt="Аватар профиля" />
            ) : (
              profile.avatar
            )}
          </div>
          <div className="profile-page-identity">
            <h2>{profile.name}</h2>
            <span>@{profile.username}</span>
            
<span className="profile-custom-status">
  {profile.customStatus || 'Статус не указан'}
</span>

<span className={`profile-online-status status-${profile.status || 'online'}`}>
  <i className="online-dot profile-status-dot" />
  {profile.status === 'dnd'
    ? 'Не беспокоить'
    : profile.status === 'away'
      ? 'Нет на месте'
      : 'В сети'}
</span>

            {isPremium && <span className="profile-premium-badge"><Crown size={13} /> Premium</span>}
          </div>
          <button className="primary-button" onClick={() => {
            setProfileDraft(profile)
            setProfileEditing(!profileEditing)
          }}>
            <Pencil size={16} /> {profileEditing ? 'Отмена' : 'Изменить'}
          </button>
        </div>

        {!profileEditing ? (
          <div className="profile-details">
            <span>О себе</span>
            <p>{profile.bio || 'Описание не добавлено'}</p>
            <span>Имя пользователя</span>
            <p>@{profile.username}</p>
            <span>Статус</span>
            <p><i className="online-dot profile-status-dot" /> В сети</p>
          </div>
        ) : (
          <form className="profile-edit-form" onSubmit={saveProfile}>
            <label>Аватар профиля</label>
            <div className="avatar-choices">
              {['💎', '👑', '🚀', '🐱', '🌌', '🦊', '🐼', '😎'].map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  className={`avatar-choice ${profileDraft.avatar === avatar ? 'active' : ''}`}
                  onClick={() => setProfileDraft({ ...profileDraft, avatar })}
                >
                  {avatar}
                </button>
              ))}
            </div>

            <label className="avatar-upload-button">
              📷 Загрузить фото из галереи
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (!file) return

                  const reader = new FileReader()
                  reader.onload = () => {
                    setProfileDraft({
                      ...profileDraft,
                      avatar: reader.result,
                    })
                  }
                  reader.readAsDataURL(file)
                }}
              />
            </label>

            <label>Имя
              <input maxLength={40} value={profileDraft.name} onChange={e => setProfileDraft({ ...profileDraft, name: e.target.value })} />
            </label>
            <label>Юзернейм
              <div className="username-input"><span>@</span><input maxLength={32} value={profileDraft.username} onChange={e => setProfileDraft({ ...profileDraft, username: e.target.value.replace(/^@+/, '').replace(/[^a-zA-Z0-9_]/g, '') })} /></div>
            </label>
            <label>О себе
              
<label>Статус
  <select
    value={profileDraft.status || 'online'}
    onChange={e =>
      setProfileDraft({
        ...profileDraft,
        status: e.target.value,
      })
    }
  >
    <option value="online">🟢 В сети</option>
    <option value="dnd">🔕 Не беспокоить</option>
    <option value="away">🌙 Нет на месте</option>
  </select>
</label>

<label>Строка под именем
  <input
    maxLength={60}
    placeholder="Например, ✨ Всегда на связи"
    value={profileDraft.customStatus || ''}
    onChange={e =>
      setProfileDraft({
        ...profileDraft,
        customStatus: e.target.value,
      })
    }
  />
</label>

              <textarea maxLength={160} rows={3} value={profileDraft.bio} onChange={e => setProfileDraft({ ...profileDraft, bio: e.target.value })} />
            </label>

            <button className="primary-button" type="submit"><Check size={17} /> Сохранить профиль</button>
          </form>
        )}
      </div>
      <InfoNote>Профиль сохраняется в этом браузере. Юзернеймы пока не проверяются на уникальность и не видны другим пользователям.</InfoNote>
    </section>
  )

  if (activeTab === 'archive') return (
    <section className="page-panel">
      <Heading title="Архив" subtitle="Архивированные диалоги" />
      <div className="empty-state"><Archive size={42} /><h2>Архив пуст</h2><p>Архивированные чаты будут отображаться здесь.</p></div>
    </section>
  )

  if (activeTab === 'wallet') return (
    <section className="page-panel">
      <Heading title="GlassCoins" subtitle="Внутренняя валюта GlassTalk" />
      <div className="wallet-hero">
        <div className="wallet-hero-top"><span>ТВОЙ БАЛАНС</span><Wallet size={22} /></div>
        <div className="wallet-total">{balance.toLocaleString('ru-RU')} <small>GC</small></div>
        <p>Используй монеты для подарков и функций платформы.</p>
        <div className="wallet-hero-actions">
          <button className="primary-button" onClick={() => notify('Реальное пополнение требует платёжной системы')}><Plus size={17} /> Пополнить</button>
          <button className="outline-button" onClick={() => notify('История операций пока не подключена')}>История операций</button>
        </div>
      </div>
      <h2 className="subheading">Пакеты монет</h2>
      <div className="package-grid">
        {[{ amount: 500, price: 99 }, { amount: 1500, price: 249 }, { amount: 5000, price: 699 }].map((item) => (
          <article className="package-card" key={item.amount}>
            <div className="coin-symbol">◈</div><strong>{item.amount.toLocaleString('ru-RU')} GC</strong>
            <span>{item.price} ₽</span>
            <button className="secondary-button" onClick={() => notify('Оплата пока не подключена')}>Выбрать</button>
          </article>
        ))}
      </div>
      <InfoNote>Покупки демонстрационные. Реальные платежи не принимаются.</InfoNote>
    </section>
  )

  if (activeTab === 'gifts') return (
    <section className="page-panel">
      <Heading title="Подарки" subtitle="Коллекционные подарки GlassTalk" />
      <div className="gift-grid">
        {giftItems.map((gift) => (
          <article className="gift-card" key={gift.id}>
            <div className="gift-art">{gift.emoji}</div><span className="rarity-label">{gift.rarity}</span>
            <h3>{gift.name}</h3><div className="gift-price">◈ {gift.price} GC</div>
            <button className="secondary-button" onClick={() => buyGift(gift)}>Получить</button>
          </article>
        ))}
      </div>
      <InfoNote>Коллекционные номера и передача подарков требуют серверного хранения.</InfoNote>
    </section>
  )

  if (activeTab === 'premium') return (
    <section className="page-panel">
      <Heading title="GlassTalk Premium" subtitle="Больше возможностей для общения" />
      <div className="premium-card">
        <div className="premium-icon"><Crown size={34} /></div>
        <h2>{isPremium ? 'Premium активирован в деморежиме' : 'Твой GlassTalk. Ещё больше возможностей.'}</h2>
        <p>Особый значок профиля, дополнительные темы и эксклюзивные подарки.</p>
        <div className="premium-features">
          <div><Check size={18} /> Значок Premium</div>
          <div><Check size={18} /> Дополнительные темы</div>
          <div><Check size={18} /> Эксклюзивные подарки</div>
        </div>
        <button className="premium-button" onClick={() => { setIsPremium(true); notify('Premium включён только в деморежиме') }}>
          <Crown size={18} /> {isPremium ? 'Premium активен' : 'Попробовать Premium · 299 ₽'}
        </button>
        <small>Оплата не производится. Подписка демонстрационная.</small>
      </div>
    </section>
  )

  if (activeTab === 'admin') return (
    <section className="page-panel">
      <Heading title="Панель владельца" subtitle="Управление GlassTalk" />
      <div className="admin-warning"><ShieldCheck size={22} /><div><strong>Демонстрационная панель</strong><p>Реальная защита владельца требует серверной авторизации.</p></div></div>
      <div className="stats-grid">
        <div className="stat-card"><span>Пользователи</span><strong>—</strong><small>Нет сервера</small></div>
        <div className="stat-card"><span>Оборот</span><strong>—</strong><small>Платежи не подключены</small></div>
        <div className="stat-card"><span>Диалоги</span><strong>{chats.length}</strong><small>Демо-данные</small></div>
      </div>
      <h2 className="subheading">Инструменты</h2>
      <div className="admin-tools">
        <button className="page-card" onClick={() => notify('Управление пользователями требует сервера')}><Users size={21} /><span><strong>Пользователи</strong><small>Аккаунты и роли</small></span><ChevronRight size={18} /></button>
        <button className="page-card" onClick={() => notify('Настройки пока демонстрационные')}><Settings size={21} /><span><strong>Настройки платформы</strong><small>Общие параметры</small></span><ChevronRight size={18} /></button>
        <button className="page-card" onClick={() => notify('Журнал событий пока не подключён')}><Bell size={21} /><span><strong>Журнал событий</strong><small>Действия и уведомления</small></span><ChevronRight size={18} /></button>
      </div>
    </section>
  )

  return (
    <section className="page-panel">
      <Heading title="Настройки" subtitle="Настрой GlassTalk под себя" />
      <div className="admin-tools">
        <button className="page-card" onClick={() => notify('Настройки уведомлений скоро появятся')}><Bell size={21} /><span><strong>Уведомления</strong><small>Звуки и сообщения</small></span><ChevronRight size={18} /></button>
        <button className="page-card" onClick={() => notify('Безопасность аккаунта пока не подключена')}><LockKeyhole size={21} /><span><strong>Конфиденциальность</strong><small>Безопасность и доступ</small></span><ChevronRight size={18} /></button>
        <button className="page-card" onClick={() => notify('GlassTalk · демонстрационная версия')}><CircleHelp size={21} /><span><strong>О приложении</strong><small>GlassTalk Desktop</small></span><ChevronRight size={18} /></button>
      </div>
    </section>
  )
}

return (
  <main className="app-shell">
    
<section className="secondary-sidebar">
  <header className="secondary-sidebar-header">
    <button
      className="icon-button"
      onClick={() => setActiveTab('chats')}
      aria-label="К чатам"
    >
      <ArrowLeft size={20} />
    </button>
    <strong>GlassTalk</strong>
  </header>

  <div className="secondary-caption">РАЗДЕЛЫ</div>

  {[
    ['profile', User, 'Мой профиль'],
    ['chats', MessageCircle, 'Все чаты'],
    ['wallet', Wallet, `GlassCoins · ${balance.toLocaleString('ru-RU')}`],
    ['gifts', Gift, 'Подарки'],
    ['premium', Crown, 'Premium'],
    ['admin', ShieldCheck, 'Панель владельца'],
    ['settings', Settings, 'Настройки'],
  ].map(([id, Icon, label]) => (
    <button
      key={id}
      className={`secondary-nav-item ${activeTab === id ? 'secondary-nav-active' : ''}`}
      onClick={() => setActiveTab(id)}
    >
      <Icon size={20} /> {label}
    </button>
  ))}
</section>

    {activeTab === 'chats' ? (
      <>
        <section className="chat-list-panel">
          <header className="list-header">
            <div className="list-title-row">
              <button className="mobile-menu icon-button" onClick={() => setActiveTab('chats')} aria-label="Меню"><Menu size={21} /></button>
              <h1>GlassTalk</h1>
              <button className="icon-button" title="Новый чат" onClick={() => notify('Создание чатов появится после подключения сервера')}><Plus size={21} /></button>
            </div>
            <label className="search-box">
              <Search size={18} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Поиск" aria-label="Поиск чатов" />
              {search && <button onClick={() => setSearch('')} aria-label="Очистить"><X size={16} /></button>}
            </label>
            <div className="filter-row">
              <button className="filter-pill filter-selected" onClick={() => setSearch('')}>Все</button>
              <button className="filter-pill" onClick={() => setSearch('GlassTalk')}>Личные</button>
              <button className="filter-pill" onClick={() => setSearch('Bot')}>Боты</button>
            </div>
          </header>

          <div className="chat-list">
            {filteredChats.map((chat) => (
              <button key={chat.id}
                className={`chat-list-item ${selectedChat === chat.id ? 'chat-selected' : ''}`}
                onClick={() => openChat(chat)}
                onContextMenu={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  setMenu({ type: 'chat', id: chat.id, x: event.clientX, y: event.clientY })
                }}>
                <Avatar emoji={chat.avatar} color={chat.color} online={chat.online} />
                <div className="chat-item-content">
                  <div className="chat-item-top">
                    <strong>{chat.pinned && <Pin size={12} className="inline-pin" />} {chat.name}</strong>
                    <time>{chat.time}</time>
                  </div>
                  <div className="chat-item-bottom">
                    <span>{chat.message}</span>
                    {chat.unread > 0 && <b className="unread-badge">{chat.unread}</b>}
                  </div>
                </div>
              </button>
            ))}
            {!filteredChats.length && <div className="empty-search">Ничего не найдено</div>}
          </div>
          <div className="list-footer"><LockKeyhole size={13} /> GlassTalk · демоверсия</div>
        </section>

        
<section
  className={`conversation-panel ${
    mobileChatOpen ? 'conversation-mobile-open' : ''
  } ${mobileChatClosing ? 'conversation-mobile-closing' : ''}`}
>

          <header className="conversation-header">
            
<button
  className="mobile-back icon-button"
  onClick={() => {
    setMobileChatClosing(true)
    setTimeout(() => {
      setMobileChatOpen(false)
      setMobileChatClosing(false)
    }, 220)
  }}
  aria-label="Назад"
>
  <ArrowLeft size={21} />
</button>

            <Avatar emoji={currentChat.avatar} color={currentChat.color} />
            <div className="conversation-title">
              <strong>{currentChat.name}</strong>
              <span className={currentChat.online ? 'status-online' : ''}>{currentChat.online ? 'в сети' : 'был(а) недавно'}</span>
            </div>
            <div className="conversation-actions">
              <button className="icon-button" title="Звонок" onClick={() => notify('Звонки пока не подключены')}><Phone size={20} /></button>
              <button className="icon-button" title="Поиск в чате" onClick={() => notify('Поиск по истории скоро появится')}><Search size={20} /></button>
              <button className="icon-button" title="Ещё" onClick={() => notify('Дополнительные функции скоро появятся')}><MoreVertical size={21} /></button>
            </div>
          </header>

          <div className="conversation-background" onClick={() => menu && setMenu(null)}>
            <div className="date-divider"><span>Сегодня</span></div>
            <div className="messages">

              {currentChat.messages.map((message) => (
                
<div
  key={message.id}
  className={`message-row ${message.from === 'me' ? 'message-outgoing' : ''}`}
  onContextMenu={(event) => {
    event.preventDefault()
    event.stopPropagation()
    setMenu({
      type: 'message',
      id: message.id,
      x: event.clientX,
      y: event.clientY,
    })
  }}
>
                  <div


className={`message-bubble ${message.from === 'me' ? 'bubble-outgoing' : 'bubble-incoming'} ${message.isNew ? 'message-new' : ''}`}
onAnimationEnd={() => {
  if (!message.isNew) return

  updateChat(selectedChat, (chat) => ({
    ...chat,
    messages: chat.messages.map((item) =>
      item.id === message.id
        ? { ...item, isNew: false }
        : item
    ),
  }))
}}
>
  

                  
                    
{message.replyTo && (
  <div className="reply-preview">
    <strong>
      {message.replyTo.from === 'me' ? 'Вы' : currentChat.name}
    </strong>
    <span>{message.replyTo.text}</span>
  </div>
)}
<p>{message.text}</p>

                    <div className="message-meta">
                      {message.edited && <span>изм.</span>}
                      
{(message.reactions || (message.liked ? ['👍'] : [])).map((emoji) => (
  <span className="reaction-chip" key={emoji}>
    <span className="reaction-chip-emoji">{emoji}</span>
    <span className="reaction-chip-count">1</span>
  </span>
))}

                      <time>{message.time}</time>
                      {message.from === 'me' && (
                        message.read
                          ? <CheckCheck size={15} className="read-check" />
                          : <Check size={15} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
{replyingTo && (
  <div className="replying-banner">
    <div className="replying-banner-content">
      <strong>Ответ на сообщение</strong>
      <span>{replyingTo.text}</span>
    </div>
    <button
      type="button"
      className="icon-button"
      title="Отменить ответ"
      onClick={() => setReplyingTo(null)}
    >
      <X size={18} />
    </button>
  </div>
)}

<form className="message-composer" onSubmit={sendMessage}>


            <button
              type="button"
              className="icon-button"
              title="Прикрепить файл"
              onClick={() => notify('Прикрепление файлов добавим позже')}
            >
              <Paperclip size={20} />
            </button>

            <input
              className="message-input"
              type="text"
              value={messageText}
              onChange={(event) => setMessageText(event.target.value)}
              placeholder="Написать сообщение..."
              aria-label="Текст сообщения"
            />

            <button
              className="send-button"
              type="submit"
              disabled={!messageText.trim()}
              aria-label="Отправить сообщение"
              title="Отправить"
            >
              <Send size={20} />
            </button>
          </form>
        </section>
    </>
    ) : (
      <>

        <section className="content-area">{renderPage()}</section>
      </>
    )}

    {menu && (
      <div className="context-menu" style={{ left: Math.min(menu.x, window.innerWidth - 220), top: Math.min(menu.y, window.innerHeight - 230) }} onClick={(event) => event.stopPropagation()}>
        {menu.type === 'chat' ? (
          <>
            <button onClick={() => togglePin(menu.id)}><Pin size={16} /> {chats.find((chat) => chat.id === menu.id)?.pinned ? 'Открепить чат' : 'Закрепить чат'}</button>
            <button onClick={() => markUnread(menu.id)}><Bell size={16} /> Отметить непрочитанным</button>
            <button onClick={() => { setMenu(null); notify('Архивирование добавим следующим обновлением') }}><Archive size={16} /> В архив</button>
          </>
        ) : (
          <>
            <button onClick={() => {
              const message = currentChat.messages.find((item) => item.id === menu.id)
              if (message) copyMessage(message.text)
            }}><Copy size={16} /> Копировать текст</button>
            
            <button onClick={() => {
              const message = currentChat.messages.find((item) => item.id === menu.id)
              if (message) setReplyingTo(message)
              setMenu(null)
            }}><MessageCircle size={16} /> Ответить</button>
            
            <button onClick={() => {
              const message = currentChat.messages.find((item) => item.id === menu.id)
              if (!message) return
              setForwardingMessage(message)
              setMenu(null)
            }}><Send size={16} /> Переслать</button>


            <div className="reaction-picker">
  {['👍', '❤️', '😂', '😮', '😢', '🔥', '🎉', '👎'].map((emoji) => (
    <button
      key={emoji}
      type="button"
      className={`reaction-option ${
  (currentChat.messages.find((item) => item.id === menu.id)?.reactions || []).includes(emoji)
    ? 'reaction-option-selected'
    : ''
}`}
      title={`Поставить ${emoji}`}
      onClick={() => toggleReaction(menu.id, emoji)}
    >
      {emoji}
    </button>
  ))}
</div>
            {currentChat.messages.find((item) => item.id === menu.id)?.from === 'me' && (
              <>
                <button onClick={() => {
                  const message = currentChat.messages.find((item) => item.id === menu.id)
                  setEditing(message.id)
                  setEditText(message.text)
                  setMenu(null)
                }}><Pencil size={16} /> Редактировать</button>
                <button className="context-danger" onClick={() => deleteMessage(menu.id)}><Trash2 size={16} /> Удалить сообщение</button>
              </>
            )}
          </>
        )}
      </div>
    )}

    {notice && <div className="toast-message">{notice}</div>}
    
{forwardingMessage && (
  <div className="forward-modal-overlay" onClick={() => setForwardingMessage(null)}>
    <div className="forward-modal" onClick={(event) => event.stopPropagation()}>
      <div className="forward-modal-header">
        <h2>Переслать сообщение</h2>
        <button
          type="button"
          className="icon-button"
          onClick={() => setForwardingMessage(null)}
        >
          <X size={18} />
        </button>
      </div>

      <p className="forward-message-preview">
        {forwardingMessage.text}
      </p>

      <div className="forward-chat-list">
        {chats.filter((chat) => chat.id !== selectedChat).map((chat) => (
          <button
            type="button"
           
className="forward-chat-option"
key={chat.id}
onClick={() => {
  const forwardedText = forwardingMessage.text
  const time = new Date().toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  })

  updateChat(chat.id, (targetChat) => ({
    ...targetChat,
    message: forwardedText,
    time,
    messages: [
      ...(targetChat.messages || []),
      {
        id: Date.now(),
        from: 'me',
        text: forwardedText,
        time,
        read: false,
        forwarded: true,
      },
    ],
  }))

  setForwardingMessage(null)
  notify('Сообщение переслано')
}}
>
  <span className="avatar">{chat.avatar}</span>
  <span>{chat.name}</span>
  <Send size={16} />
</button>

        ))}
      </div>
    </div>
  </div>
)}

  </main>
)
}
