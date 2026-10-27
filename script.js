/* Luis Camargo — portfólio. Interface, movimento e cena 3D (Three.js r149). */
(function () {
  'use strict';

  /* ================= CONFIGURAÇÃO ================= */
  const CONFIG = {
    email: 'luiscamargodosantos@gmail.com',
    github: 'https://github.com/luiscamargo315',
    linkedin: 'https://www.linkedin.com/in/LuisDosSantos'
  };

  /* ================= CONTEÚDO ================= */
  const PROJECTS = [
    {
      id: '001', title: 'Dashboard Analytics', category: 'Visualização de dados', year: '2025',
      tags: 'React, API, Charts', role: 'Design de interface e front-end',
      desc: 'Painel interativo de métricas em tempo real com gráficos dinâmicos e filtros avançados.',
      context: 'Quem acompanha indicadores todos os dias precisa entender rápido o que mudou. O desafio foi organizar muitos números em uma tela que mostra primeiro o essencial e deixa o detalhe a um clique.',
      process: [
        'Listei as perguntas que o painel precisava responder e ordenei por frequência de uso.',
        'Prototipei a hierarquia no Figma com dados de exemplo e testei a leitura em telas pequenas.',
        'Construí os componentes em React, consumindo uma API REST com atualização em tempo real.'
      ],
      solution: 'Gráficos dinâmicos, filtros por período e por categoria, e estados de carregamento e de vazio pensados com o mesmo cuidado da tela principal.',
      alts: ['Blocos brancos de alturas diferentes, um deles azul.', 'Os blocos vistos de cima.', 'Detalhe do bloco azul.']
    },
    {
      id: '002', title: 'E-commerce Redesign', category: 'Redesign · Mobile', year: '2025',
      tags: 'UI/UX, Figma, CSS', role: 'Pesquisa, UX/UI e guia de estilo',
      desc: 'Redesign completo de loja virtual com foco em conversão e experiência mobile.',
      context: 'A loja funcionava, mas a compra pelo celular tinha passos demais e pouca clareza sobre preço e entrega. O foco foi simplificar o caminho até o checkout.',
      process: [
        'Mapeei o fluxo de compra atual e marquei cada ponto de dúvida.',
        'Redesenhei vitrine, página de produto e carrinho pensando primeiro no celular.',
        'Documentei o sistema visual em CSS para manter a consistência entre as páginas.'
      ],
      solution: 'Vitrine com fotos maiores, preço e frete sempre visíveis e um checkout em menos etapas.',
      alts: ['Três pedestais com uma esfera, um cubo e um cone azul.', 'Os pedestais vistos de lado.', 'Detalhe do cubo no pedestal do meio.']
    },
    {
      id: '003', title: 'App de Gestão', category: 'Aplicação web', year: '2024',
      tags: 'Node.js, MongoDB, Full-stack', role: 'Desenvolvimento full-stack e interface',
      desc: 'Aplicação web para gestão de tarefas com autenticação, dashboard e notificações.',
      context: 'Equipes pequenas costumam espalhar tarefas entre planilhas e mensagens. A proposta foi reunir tudo em um só lugar, com acesso seguro para cada pessoa.',
      process: [
        'Modelei os dados de projetos, tarefas e usuários no MongoDB.',
        'Criei a API em Node.js com autenticação e permissões por usuário.',
        'Desenhei o dashboard e as notificações para mostrar primeiro o que vence antes.'
      ],
      solution: 'Login seguro, painel com as prioridades do dia, notificações de prazo e organização por projeto.',
      alts: ['Placas empilhadas sobre fundo escuro, uma delas azul.', 'As placas vistas de cima.', 'As placas vistas de lado.']
    },
    {
      id: '004', title: 'Landing Page Startup', category: 'Landing page', year: '2024',
      tags: 'HTML, GSAP, Design', role: 'Direção de arte, animação e desenvolvimento',
      desc: 'Página de apresentação com animações fluidas, scroll storytelling e formulário de captação.',
      context: 'Uma startup precisava apresentar o produto em poucos segundos e captar os primeiros contatos interessados.',
      process: [
        'Escrevi a narrativa da página em blocos curtos, do problema à solução.',
        'Animei cada bloco com GSAP para revelar a história no ritmo da rolagem.',
        'Integrei um formulário de captação simples, com validação no navegador.'
      ],
      solution: 'Uma página leve, com scroll storytelling, animações fluidas e um formulário de captação direto ao ponto.',
      alts: ['Um arco branco com uma esfera azul por baixo.', 'O arco visto de lado.', 'O arco visto de cima.']
    }
  ];

  const STEPS = [
    {
      title: 'Pesquisa',
      text: 'Entender antes de desenhar. Converso com quem vai usar, levanto referências e mapeio o que já existe.',
      list: ['Mapa de referências', 'Perguntas-chave do projeto', 'Objetivos e restrições']
    },
    {
      title: 'Direção',
      text: 'Escolher um caminho. Defino conceito, tipografia, cor e movimento, e testo a direção em poucas telas antes de escalar.',
      list: ['Conceito visual', 'Moodboard e sistema tipográfico', 'Protótipo de baixa fidelidade']
    },
    {
      title: 'Criação',
      text: 'Construir o sistema completo: componentes, interações e código. Design e desenvolvimento andam juntos.',
      list: ['Interface final', 'Componentes reutilizáveis', 'Animações e interações']
    },
    {
      title: 'Entrega',
      text: 'Publicar com cuidado. Reviso performance, acessibilidade e responsividade, documento e acompanho os primeiros ajustes.',
      list: ['Site publicado', 'Documentação', 'Ajustes pós-lançamento']
    }
  ];

  /* ================= UTILITÁRIOS ================= */
  const doc = document.documentElement;
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const damp = (rate, dt) => 1 - Math.exp(-rate * dt);
  const easeOut = (x) => 1 - Math.pow(1 - x, 3);
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* armazenamento indisponível */ } }
  };
  const reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');
  const darkMQ = matchMedia('(prefers-color-scheme: dark)');

  const savedMotion = store.get('motion');
  const state = {
    motion: savedMotion ? savedMotion === 'on' : !reduceMQ.matches,
    px: 0,
    py: 0
  };

  doc.classList.add('js');
  if (state.motion) doc.classList.add('anim');

  /* ================= CONFIG NO DOM ================= */
  $('#year').textContent = new Date().getFullYear();
  $('#mail-text').textContent = CONFIG.email;
  $('#mail-btn').href = 'mailto:' + CONFIG.email;
  $('#link-github').href = CONFIG.github;
  $('#link-linkedin').href = CONFIG.linkedin;

  /* ================= ENTRADA ================= */
  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 800))]).then(() => {
    requestAnimationFrame(() => doc.classList.add('ready'));
  });

  /* ================= TEMA ================= */
  const themeBtn = $('#theme-toggle');
  const savedTheme = store.get('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') doc.dataset.theme = savedTheme;
  const isDark = () => (doc.dataset.theme ? doc.dataset.theme === 'dark' : darkMQ.matches);
  function syncThemeBtn() { themeBtn.textContent = isDark() ? 'Tema claro' : 'Tema escuro'; }
  themeBtn.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    doc.dataset.theme = next;
    store.set('theme', next);
    syncThemeBtn();
  });
  darkMQ.addEventListener('change', syncThemeBtn);
  syncThemeBtn();

  /* ================= MOVIMENTO ================= */
  const motionBtn = $('#motion-toggle');
  function applyMotion() {
    motionBtn.setAttribute('aria-pressed', String(!state.motion));
    motionBtn.textContent = state.motion ? 'Pausar animações' : 'Retomar animações';
  }
  motionBtn.addEventListener('click', () => {
    state.motion = !state.motion;
    store.set('motion', state.motion ? 'on' : 'off');
    applyMotion();
  });
  applyMotion();

  /* ================= MENU ================= */
  const header = $('.nav');
  const menuBtn = $('#menu-btn');
  const navLinks = $('#nav-links');
  function setMenu(open) {
    header.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'Fechar' : 'Menu';
  }
  menuBtn.addEventListener('click', () => setMenu(!header.classList.contains('open')));
  $$('a', navLinks).forEach((a) => a.addEventListener('click', () => setMenu(false)));

  /* ================= TOM DO FUNDO E SEÇÃO ATIVA ================= */
  const linkEls = $$('a', navLinks);
  const toneIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      document.body.dataset.tone = e.target.dataset.tone || 'paper';
      linkEls.forEach((a) => {
        if (a.getAttribute('href') === '#' + e.target.id) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-50% 0px -50% 0px' });
  $$('main section[id]').forEach((s) => toneIO.observe(s));

  /* ================= REVELAÇÃO AO ROLAR ================= */
  if (state.motion) {
    const revealIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.remove('pre');
        revealIO.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
    $$('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top > innerHeight * 0.92) {
        el.classList.add('pre');
        revealIO.observe(el);
      }
    });
  }

  /* ================= CONTADORES ================= */
  const statsEl = $('#stats');
  if (state.motion && statsEl.getBoundingClientRect().top > innerHeight) {
    const nums = $$('[data-count]', statsEl);
    nums.forEach((n) => { n.textContent = '0'; });
    const cIO = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      cIO.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = clamp((now - start) / 1200, 0, 1);
        nums.forEach((n) => { n.textContent = Math.round(easeOut(p) * Number(n.dataset.count)); });
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    cIO.observe(statsEl);
  }

  /* ================= PONTEIRO E CABEÇALHO ================= */
  addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    state.px = (e.clientX / innerWidth) * 2 - 1;
    state.py = -((e.clientY / innerHeight) * 2 - 1);
  }, { passive: true });

  const onScroll = () => header.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ================= MOTOR 3D (carregamento progressivo) ================= */
  let Engine = null;
  let engineTried = false;
  const engineQueue = [];
  function whenEngine(fn) {
    if (engineTried) fn(Engine);
    else engineQueue.push(fn);
  }
  function boot3D() {
    try { Engine = createEngine(); } catch (err) { console.warn('3D indisponível:', err); Engine = null; }
    engineTried = true;
    if (!Engine) {
      doc.classList.add('no-webgl');
      $('#lab-note').hidden = false;
      $$('#lab-shapes button, #lab-colors button, #lab-reset').forEach((b) => { b.disabled = true; });
    }
    engineQueue.splice(0).forEach((fn) => fn(Engine));
  }
  if (document.readyState === 'complete') setTimeout(boot3D, 60);
  else addEventListener('load', () => setTimeout(boot3D, 60));

  /* ================= CAPAS ================= */
  function loadCover(coverEl, id, idx) {
    const img = $('img', coverEl);
    const [w, h] = (coverEl.dataset.size || '1200x800').split('x').map(Number);
    whenEngine((E) => {
      if (!E) return;
      E.shot(id, idx, w, h).then((url) => {
        if (!url) return;
        img.onload = () => requestAnimationFrame(() => img.classList.add('in'));
        img.src = url;
        img.hidden = false;
      });
    });
  }
  const coverIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      coverIO.unobserve(e.target);
      loadCover(e.target, e.target.dataset.cover, 0);
    });
  }, { rootMargin: '600px 0px' });
  $$('.work .cover').forEach((c) => coverIO.observe(c));

  /* ================= PÁGINA DE PROJETO ================= */
  const overlay = $('#project');
  const pjBody = $('#pj-body');
  const pjBack = $('#pj-back');
  const mainEl = $('main');
  let currentProject = null;
  let returnFocus = null;
  let closeTimer = 0;

  $$('.work-item').forEach((a) => a.addEventListener('click', () => { returnFocus = a; }));

  function projectHTML(p) {
    const i = PROJECTS.indexOf(p);
    const next = PROJECTS[(i + 1) % PROJECTS.length];
    return (
      '<header class="pj-head">' +
        '<h2 id="pj-title">' + p.title + '</h2>' +
        '<dl class="pj-meta">' +
          '<div><dt>Categoria</dt><dd>' + p.category + '</dd></div>' +
          '<div><dt>Ano</dt><dd>' + p.year + '</dd></div>' +
          '<div><dt>Tecnologias</dt><dd>' + p.tags + '</dd></div>' +
          '<div><dt>Papel</dt><dd>' + p.role + '</dd></div>' +
        '</dl>' +
      '</header>' +
      '<figure class="pj-fig pj-hero"><div class="cover" data-cover="' + p.id + '" data-size="1600x900" style="--ar: 16 / 9"><img alt="' + p.alts[0] + '" hidden></div></figure>' +
      '<p class="pj-lead">' + p.desc + '</p>' +
      '<div class="pj-cols">' +
        '<section><h3>Contexto</h3><p>' + p.context + '</p></section>' +
        '<section><h3>Processo</h3><ol>' + p.process.map((s) => '<li>' + s + '</li>').join('') + '</ol></section>' +
        '<section><h3>Solução</h3><p>' + p.solution + '</p></section>' +
      '</div>' +
      '<figure class="pj-fig pj-a"><div class="cover" data-cover="' + p.id + '" data-size="1200x900" style="--ar: 4 / 3"><img alt="' + p.alts[1] + '" hidden></div></figure>' +
      '<figure class="pj-fig pj-b"><div class="cover" data-cover="' + p.id + '" data-size="900x1125" style="--ar: 4 / 5"><img alt="' + p.alts[2] + '" hidden></div></figure>' +
      '<nav class="pj-next" aria-label="Próximo projeto"><span class="label">Próximo projeto</span>' +
        '<a href="#projeto-' + next.id + '">' + next.title + ' <span aria-hidden="true">→</span></a></nav>' +
      '<p class="pj-note">Projeto demonstrativo. As imagens são modelos 3D feitos para este portfólio.</p>'
    );
  }

  function openProject(id) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) return;
    clearTimeout(closeTimer);
    if (!returnFocus) returnFocus = document.activeElement;
    currentProject = id;
    pjBody.innerHTML = projectHTML(p);
    $('#pj-count').textContent = (PROJECTS.indexOf(p) + 1) + ' de ' + PROJECTS.length;
    $$('.cover', pjBody).forEach((c, k) => loadCover(c, p.id, k));
    overlay.scrollTop = 0;
    if (overlay.hidden) {
      overlay.hidden = false;
      void overlay.offsetHeight;
      overlay.classList.add('show');
      doc.classList.add('pj-open');
      mainEl.inert = true;
      header.inert = true;
    }
    pjBack.focus({ preventScroll: true });
  }

  function closeProject(fromHash) {
    if (overlay.hidden || !currentProject) return;
    currentProject = null;
    overlay.classList.remove('show');
    doc.classList.remove('pj-open');
    mainEl.inert = false;
    header.inert = false;
    const done = () => { overlay.hidden = true; pjBody.innerHTML = ''; };
    if (state.motion && !reduceMQ.matches) closeTimer = setTimeout(done, 520);
    else done();
    if (!fromHash && /^#projeto-/.test(location.hash)) {
      try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* sem histórico */ }
    }
    if (returnFocus && returnFocus.focus) returnFocus.focus({ preventScroll: true });
    returnFocus = null;
  }

  function syncHash() {
    const m = location.hash.match(/^#projeto-(\d{3})$/);
    if (m) openProject(m[1]);
    else closeProject(true);
  }
  addEventListener('hashchange', syncHash);
  pjBack.addEventListener('click', () => closeProject(false));
  syncHash();

  addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (currentProject) closeProject(false);
    else if (header.classList.contains('open')) { setMenu(false); menuBtn.focus(); }
  });

  /* ================= PROCESSO (abas) ================= */
  const stepsEl = $('#steps');
  const tabs = $$('[role="tab"]', stepsEl);
  const stepPanel = $('#step-panel');
  let stepIndex = 0;
  let stepTimer = 0;
  function fillStep(i) {
    const s = STEPS[i];
    $('#step-title').textContent = s.title;
    $('#step-text').textContent = s.text;
    $('#step-list').innerHTML = s.list.map((x) => '<li>' + x + '</li>').join('');
  }
  function selectStep(i, focus) {
    if (focus) tabs[i].focus();
    if (i === stepIndex) return;
    stepIndex = i;
    tabs.forEach((t, k) => {
      t.setAttribute('aria-selected', String(k === i));
      t.tabIndex = k === i ? 0 : -1;
    });
    stepPanel.setAttribute('aria-labelledby', tabs[i].id);
    stepsEl.style.setProperty('--i', i);
    clearTimeout(stepTimer);
    if (state.motion) {
      stepPanel.classList.add('out');
      stepTimer = setTimeout(() => { fillStep(i); stepPanel.classList.remove('out'); }, 220);
    } else {
      fillStep(i);
    }
    if (Engine) Engine.setStep(i);
  }
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => selectStep(i));
    t.addEventListener('keydown', (e) => {
      let n = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = tabs.length - 1;
      if (n !== null) { e.preventDefault(); selectStep(n, true); }
    });
  });

  /* ================= COPIAR ================= */
  function copyText(text, btn, selectEl) {
    if (!btn.dataset.label) btn.dataset.label = btn.textContent;
    const say = (msg) => {
      btn.textContent = msg;
      clearTimeout(btn._t);
      btn._t = setTimeout(() => { btn.textContent = btn.dataset.label; }, 1800);
    };
    const fallback = () => {
      if (!selectEl) { say('Não foi possível copiar'); return; }
      const r = document.createRange();
      r.selectNodeContents(selectEl);
      const sel = getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
      say('Selecionado, use Ctrl+C');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => say('Copiado'), fallback);
    } else {
      fallback();
    }
  }
  $('#copy-mail').addEventListener('click', (e) => copyText(CONFIG.email, e.currentTarget, $('#mail-text')));

  /* ================= FORMULÁRIO ================= */
  const form = $('#contact-form');
  const formOk = $('#form-ok');
  const RULES = {
    name: [(v) => v.trim().length >= 2, 'Insira seu nome completo.'],
    email: [(v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), 'Insira um e-mail válido.'],
    message: [(v) => v.trim().length >= 10, 'A mensagem deve ter pelo menos 10 caracteres.']
  };
  let draft = '';
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let firstBad = null;
    Object.keys(RULES).forEach((id) => {
      const el = $('#' + id);
      const err = $('#err-' + id);
      const [test, msg] = RULES[id];
      if (test(el.value)) {
        el.removeAttribute('aria-invalid');
        err.textContent = '';
      } else {
        el.setAttribute('aria-invalid', 'true');
        err.textContent = msg;
        if (!firstBad) firstBad = el;
      }
    });
    if (firstBad) { formOk.hidden = true; firstBad.focus(); return; }
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    draft = $('#message').value.trim() + '\n\n' + name + ' (' + email + ')';
    $('#form-mailto').href = 'mailto:' + CONFIG.email +
      '?subject=' + encodeURIComponent('Contato pelo portfólio: ' + name) +
      '&body=' + encodeURIComponent(draft);
    formOk.hidden = false;
  });
  $$('input, textarea', form).forEach((el) => el.addEventListener('input', () => {
    if (el.getAttribute('aria-invalid') === 'true' && RULES[el.id][0](el.value)) {
      el.removeAttribute('aria-invalid');
      $('#err-' + el.id).textContent = '';
    }
  }));
  $('#copy-msg').addEventListener('click', (e) => copyText(draft, e.currentTarget, null));

  /* =====================================================================
     CENA 3D — formas simples, cores lisas e sombra suave.
     Um único renderizador WebGL desenha todas as vistas da página.
     ===================================================================== */
  function createEngine() {
    const T = window.THREE;
    if (!T) return null;
    T.ColorManagement.legacyMode = false;

    const renderer = new T.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    const lowPower = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4 || matchMedia('(max-width: 760px)').matches;
    const DPR = Math.min(window.devicePixelRatio || 1, lowPower ? 1.25 : 1.75);
    const MAX_PIX = lowPower ? 1.6e6 : 3.4e6;
    renderer.setPixelRatio(1);
    renderer.outputEncoding = T.sRGBEncoding;
    renderer.toneMapping = T.NoToneMapping;
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = T.PCFSoftShadowMap;
    const glCanvas = renderer.domElement;
    let glW = 0, glH = 0;
    function ensure(w, h) {
      if (w > glW || h > glH) {
        glW = Math.max(glW, w);
        glH = Math.max(glH, h);
        renderer.setSize(glW, glH, false);
      }
    }
    let lost = false;
    glCanvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); lost = true; });

    /* ---------- Cores e materiais ---------- */
    const WHITE = 0xefede9, BLUE = 0x0033ff, GRAY = 0xb4b6bb;
    const matte = (hex, rough) => new T.MeshStandardMaterial({ color: hex, roughness: rough == null ? 0.6 : rough, metalness: 0 });

    function lights(scene, keyI, shadowSize) {
      scene.add(new T.HemisphereLight(0xffffff, 0x8d8c88, 0.62));
      const key = new T.DirectionalLight(0xffffff, keyI || 1.0);
      key.position.set(2.5, 6, 4);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.bias = -0.0005;
      key.shadow.radius = 4;
      const s = shadowSize || 4;
      Object.assign(key.shadow.camera, { left: -s, right: s, top: s, bottom: -s, near: 0.5, far: 20 });
      scene.add(key);
      return key;
    }
    function ground(y, opacity) {
      const g = new T.Mesh(new T.PlaneGeometry(30, 30), new T.ShadowMaterial({ opacity: opacity == null ? 0.16 : opacity }));
      g.rotation.x = -Math.PI / 2;
      g.position.y = y;
      g.receiveShadow = true;
      return g;
    }
    function solid(geo, mat) {
      const m = new T.Mesh(geo, mat);
      m.castShadow = true;
      m.receiveShadow = true;
      return m;
    }

    /* ---------- Vistas ---------- */
    const views = [];
    const visIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        const v = views.find((x) => x.el === e.target);
        if (v) v.visible = e.isIntersecting;
      });
    }, { rootMargin: '120px 0px' });
    const sizeRO = new ResizeObserver((entries) => {
      entries.forEach((e) => {
        const v = views.find((x) => x.el === e.target);
        if (v) resizeView(v);
      });
    });
    function resizeView(v) {
      const r = v.el.getBoundingClientRect();
      const cw = Math.max(1, r.width), ch = Math.max(1, r.height);
      const d = Math.min(DPR, Math.sqrt(MAX_PIX / (cw * ch)));
      v.w = Math.max(1, Math.round(cw * d));
      v.h = Math.max(1, Math.round(ch * d));
      v.canvas.width = v.w;
      v.canvas.height = v.h;
      v.camera.aspect = cw / ch;
      v.camera.updateProjectionMatrix();
      if (v.layout) v.layout(cw / ch);
    }
    function addView(name, def) {
      const el = $('[data-view="' + name + '"]');
      if (!el) return null;
      const canvas = document.createElement('canvas');
      canvas.setAttribute('aria-hidden', 'true');
      el.prepend(canvas);
      const v = Object.assign({ el, canvas, ctx: canvas.getContext('2d'), visible: false, w: 0, h: 0, drawn: false }, def);
      views.push(v);
      visIO.observe(el);
      sizeRO.observe(el);
      return v;
    }

    /* Ponteiro com mola: o objeto reage com peso, sem seguir o cursor ao pé da letra */
    const P = { x: 0, y: 0, vx: 0, vy: 0 };
    function stepPointer(dt) {
      const k = 9, c = 4.8;
      P.vx += ((state.px - P.x) * k - P.vx * c) * dt;
      P.vy += ((state.py - P.y) * k - P.vy * c) * dt;
      P.x += P.vx * dt;
      P.y += P.vy * dt;
    }

    /* ----- Início: cubo, esfera e cilindro ----- */
    (function heroView() {
      const scene = new T.Scene();
      lights(scene, 1.0, 4);
      const camera = new T.PerspectiveCamera(30, 1, 0.1, 60);
      const target = new T.Vector3(0, 0.6, 0);
      const group = new T.Group();
      scene.add(group);
      group.add(ground(0, 0.16));

      const items = [
        { mesh: solid(new T.BoxGeometry(1.1, 1.1, 1.1), matte(WHITE)), x: -0.85, y: 0.55, z: 0.1, ry: 0.4 },
        { mesh: solid(new T.SphereGeometry(0.62, 64, 32), matte(BLUE, 0.5)), x: 0.35, y: 0.62, z: 0.75, ry: 0 },
        { mesh: solid(new T.CylinderGeometry(0.42, 0.42, 1.7, 64), matte(GRAY)), x: 0.95, y: 0.85, z: -0.55, ry: 0 }
      ];
      items.forEach((it) => { it.mesh.position.set(it.x, it.y, it.z); it.mesh.rotation.y = it.ry; group.add(it.mesh); });

      const heroEl = $('#inicio');
      const base = { x: 1.8, y: 0, s: 1 };
      let intro = 0;
      addView('hero', {
        scene, camera,
        layout(aspect) {
          const dist = 8.9;
          const hh = Math.tan(T.MathUtils.degToRad(camera.fov / 2)) * dist;
          const hw = hh * aspect;
          if (aspect < 0.95) {
            base.s = clamp(hw / 2.6, 0.35, 0.75);
            base.x = 0;
            base.y = hh * 0.5;
          } else {
            base.s = clamp(hw / 4.6, 0.6, 0.9);
            base.x = hw * 0.5;
            base.y = 0;
          }
        },
        update(dt, adt) {
          if (doc.classList.contains('ready')) intro = state.motion ? Math.min(1, intro + dt / 1.6) : 1;
          const r = heroEl.getBoundingClientRect();
          const p = clamp(-r.top / Math.max(1, r.height), 0, 1);
          group.position.set(base.x, base.y + p * 0.8, 0);
          group.scale.setScalar(base.s);
          group.rotation.y += adt * 0.08;
          items.forEach((it, i) => {
            const e = easeOut(clamp(intro * 1.6 - i * 0.25, 0, 1));
            it.mesh.position.y = it.y + (1 - e) * 1.4;
          });
          camera.position.set(P.x * 0.7, 3.2 + P.y * 0.4, 8.5);
          camera.lookAt(target);
        }
      });
    })();

    /* ----- Playground: uma forma, quatro modelos, três cores ----- */
    (function labView() {
      const stage = $('#lab-stage');
      const hint = $('#stage-hint');
      const scene = new T.Scene();
      lights(scene, 1.25, 3);
      const camera = new T.PerspectiveCamera(30, 1, 0.1, 50);
      camera.position.set(0, 0.6, 7.4);
      camera.lookAt(0, 0, 0);

      const GEOS = {
        cube: new T.BoxGeometry(1.5, 1.5, 1.5),
        sphere: new T.SphereGeometry(1, 64, 32),
        ring: new T.TorusGeometry(0.85, 0.32, 48, 128),
        cone: new T.ConeGeometry(0.95, 1.7, 64)
      };
      const COLORS = { white: WHITE, blue: BLUE, gray: GRAY };
      const mat = matte(WHITE, 0.55);
      const mesh = solid(GEOS.cube, mat);
      const group = new T.Group();
      group.add(mesh);
      scene.add(group);

      let shapeKey = 'cube';
      let pending = null;
      let grow = 1;
      const tColor = new T.Color(WHITE);

      const shapeBtns = $$('#lab-shapes button');
      const colorBtns = $$('#lab-colors button');
      function setShape(k) {
        if (k === shapeKey && !pending) return;
        pending = k;
        shapeBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.shape === k)));
      }
      function setColor(k) {
        tColor.set(COLORS[k]);
        colorBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.color === k)));
      }
      shapeBtns.forEach((b) => b.addEventListener('click', () => setShape(b.dataset.shape)));
      colorBtns.forEach((b) => b.addEventListener('click', () => setColor(b.dataset.color)));

      let dragging = false, lastX = 0, lastY = 0, lastT = 0, vx = 0, vy = 0, resetting = false;
      const qTmp = new T.Quaternion();
      const qIdentity = new T.Quaternion();
      const AX = new T.Vector3(1, 0, 0), AY = new T.Vector3(0, 1, 0);
      function rotate(dx, dy) {
        qTmp.setFromAxisAngle(AY, dx); group.quaternion.premultiply(qTmp);
        qTmp.setFromAxisAngle(AX, dy); group.quaternion.premultiply(qTmp);
      }
      const hideHint = () => hint.classList.add('gone');
      stage.addEventListener('pointerdown', (e) => {
        dragging = true; resetting = false;
        lastX = e.clientX; lastY = e.clientY; lastT = performance.now();
        vx = vy = 0;
        try { stage.setPointerCapture(e.pointerId); } catch (err) { /* sem captura */ }
        stage.classList.add('grabbing');
        hideHint();
      });
      stage.addEventListener('pointermove', (e) => {
        if (!dragging) return;
        const now = performance.now();
        const dts = Math.max(0.008, (now - lastT) / 1000);
        const dx = (e.clientX - lastX) * 0.008;
        const dy = e.pointerType === 'touch' ? 0 : (e.clientY - lastY) * 0.008;
        lastX = e.clientX; lastY = e.clientY; lastT = now;
        rotate(dx, dy);
        vy = lerp(vy, dx / dts, 0.5);
        vx = lerp(vx, dy / dts, 0.5);
      });
      const endDrag = () => {
        if (!dragging) return;
        dragging = false;
        stage.classList.remove('grabbing');
        if (performance.now() - lastT > 90) vx = vy = 0;
      };
      stage.addEventListener('pointerup', endDrag);
      stage.addEventListener('pointercancel', endDrag);
      stage.addEventListener('keydown', (e) => {
        const k = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
        if (!k) return;
        e.preventDefault();
        resetting = false;
        vy += k[0] * 1.6;
        vx += k[1] * 1.6;
        hideHint();
      });
      $('#lab-reset').addEventListener('click', () => {
        setShape('cube');
        setColor('white');
        vx = vy = 0;
        resetting = true;
      });

      addView('lab', {
        scene, camera,
        update(dt, adt) {
          if (pending) {
            grow = lerp(grow, 0, damp(10, dt));
            if (grow < 0.03) {
              shapeKey = pending;
              pending = null;
              mesh.geometry = GEOS[shapeKey];
            }
          } else {
            grow = lerp(grow, 1, damp(7, dt));
          }
          mesh.scale.setScalar(Math.max(0.001, easeOut(clamp(grow, 0, 1))));
          mat.color.lerp(tColor, damp(6, dt));

          if (resetting) {
            group.quaternion.slerp(qIdentity, damp(4, dt));
            if (group.quaternion.angleTo(qIdentity) < 0.002) { group.quaternion.identity(); resetting = false; }
          } else if (!dragging) {
            rotate(vy * dt, vx * dt);
            const f = Math.exp(-2.6 * dt);
            vx *= f; vy *= f;
            if (adt) rotate(adt * 0.2, 0);
          }
        }
      });
    })();

    /* ----- Sobre: um anel ----- */
    (function studioView() {
      const scene = new T.Scene();
      lights(scene, 1.2, 3);
      const camera = new T.PerspectiveCamera(30, 1, 0.1, 50);
      camera.position.set(0, 1.6, 7);
      camera.lookAt(0, 0, 0);
      const torus = solid(new T.TorusGeometry(1, 0.38, 48, 128), matte(WHITE, 0.55));
      scene.add(torus);
      scene.add(ground(-1.55, 0.14));
      const el = $('[data-view="studio"]');
      let spin = 0;
      addView('studio', {
        scene, camera,
        update(dt, adt) {
          const r = el.getBoundingClientRect();
          const p = clamp((innerHeight - r.top) / (innerHeight + r.height), 0, 1);
          spin += adt * 0.15;
          torus.rotation.set(0.55 + p * 0.6, spin, 0.2);
        }
      });
    })();

    /* ----- Processo: um modelo por etapa ----- */
    const process = (function processView() {
      const scene = new T.Scene();
      lights(scene, 1.2, 3.5);
      const camera = new T.PerspectiveCamera(30, 4 / 3, 0.1, 50);
      camera.position.set(0, 2.2, 7.4);
      camera.lookAt(0, -0.1, 0);
      scene.add(ground(-1.15, 0.14));
      const groups = [];

      const sketch = new T.Group();
      sketch.add(new T.LineSegments(
        new T.EdgesGeometry(new T.IcosahedronGeometry(1.1, 1)),
        new T.LineBasicMaterial({ color: BLUE })
      ));
      groups.push(sketch);

      const trio = new T.Group();
      const c1 = solid(new T.BoxGeometry(0.8, 0.8, 0.8), matte(WHITE));
      c1.position.set(-1.25, -0.75, 0);
      const c2 = solid(new T.CylinderGeometry(0.42, 0.42, 0.8, 64), matte(GRAY));
      c2.position.set(0, -0.75, 0);
      const c3 = solid(new T.SphereGeometry(0.44, 48, 24), matte(BLUE, 0.5));
      c3.position.set(1.25, -0.71, 0);
      trio.add(c1, c2, c3);
      groups.push(trio);

      const stack = new T.Group();
      [WHITE, WHITE, GRAY, BLUE].forEach((hex, i) => {
        const b = solid(new T.BoxGeometry(1.5 - i * 0.22, 0.42, 1.5 - i * 0.22), matte(hex, i === 3 ? 0.5 : 0.6));
        b.position.y = -0.94 + i * 0.44;
        b.rotation.y = i * 0.26;
        stack.add(b);
      });
      groups.push(stack);

      const done = new T.Group();
      const plinth = solid(new T.CylinderGeometry(0.9, 0.9, 0.5, 96), matte(WHITE));
      plinth.position.y = -0.9;
      const orb = solid(new T.SphereGeometry(0.62, 64, 32), matte(BLUE, 0.45));
      orb.position.y = -0.03;
      done.add(plinth, orb);
      groups.push(done);

      const ks = [1, 0, 0, 0];
      groups.forEach((g, i) => { g.scale.setScalar(i === 0 ? 1 : 0.001); g.visible = i === 0; scene.add(g); });
      let active = 0;
      addView('process', {
        scene, camera,
        update(dt, adt) {
          groups.forEach((g, i) => {
            ks[i] = lerp(ks[i], i === active ? 1 : 0, damp(6, dt));
            const e = easeOut(clamp(ks[i], 0, 1));
            g.visible = ks[i] > 0.003;
            g.scale.setScalar(Math.max(0.001, e));
            g.rotation.y += adt * 0.15;
          });
        }
      });
      return { set(i) { active = i; } };
    })();

    /* ----- Contato: cubo e esfera ----- */
    (function contactView() {
      const scene = new T.Scene();
      lights(scene, 1.2, 3);
      const camera = new T.PerspectiveCamera(30, 1, 0.1, 50);
      camera.position.set(0, 1.4, 7.5);
      camera.lookAt(0, 0.1, 0);
      const group = new T.Group();
      const cube = solid(new T.BoxGeometry(1.3, 1.3, 1.3), matte(WHITE));
      cube.position.y = -0.45;
      const ball = solid(new T.SphereGeometry(0.55, 64, 32), matte(BLUE, 0.5));
      ball.position.y = 0.75;
      group.add(cube, ball);
      scene.add(group);
      addView('contact', {
        scene, camera,
        update(dt, adt) {
          group.rotation.y += adt * 0.2;
          group.rotation.x = lerp(group.rotation.x, -P.y * 0.15, damp(3, dt));
        }
      });
    })();

    /* ---------- Capas dos projetos (renderizadas uma vez) ---------- */
    function studio(floorHex, keyI) {
      const scene = new T.Scene();
      const floor = new T.Mesh(new T.PlaneGeometry(1000, 1000), matte(floorHex, 0.95));
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      scene.add(floor);
      scene.add(new T.HemisphereLight(0xffffff, floorHex, 0.5));
      const key = new T.DirectionalLight(0xffffff, keyI || 0.75);
      key.position.set(-4, 7, 4);
      key.castShadow = true;
      key.shadow.mapSize.set(2048, 2048);
      key.shadow.bias = -0.0004;
      Object.assign(key.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, near: 1, far: 22 });
      scene.add(key);
      return scene;
    }
    function put(scene, mesh, x, y, z) {
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      return mesh;
    }
    function cam(px, py, pz, lx, ly, lz, fov) {
      const c = new T.PerspectiveCamera(fov || 30, 1, 0.1, 600);
      c.userData.from = new T.Vector3(px, py, pz);
      c.userData.look = new T.Vector3(lx, ly, lz);
      return c;
    }
    const COVERS = {
      '001': () => {
        const s = studio(0xc9ccd3);
        [0.6, 1.1, 0.8, 1.6, 1.2, 2.1, 1.5].forEach((h, i) => put(s, new T.Mesh(new T.BoxGeometry(0.42, h, 0.42), matte(i === 5 ? BLUE : WHITE, i === 5 ? 0.5 : 0.6)), (i - 3) * 0.62, h / 2, 0));
        return { scene: s, cams: [cam(3.2, 5.2, 5.6, 0.1, 0.7, 0), cam(0.01, 9, 2.4, 0, 0, 0, 34), cam(-1.8, 2.8, 2.8, 1.2, 0.9, 0, 30)] };
      },
      '002': () => {
        const s = studio(0xe3dfd7);
        [[-1.4, 0.9], [0, 1.4], [1.4, 0.6]].forEach(([x, h]) => put(s, new T.Mesh(new T.CylinderGeometry(0.55, 0.55, h, 96), matte(0xf5f3ee, 0.7)), x, h / 2, 0));
        put(s, new T.Mesh(new T.SphereGeometry(0.42, 64, 32), matte(GRAY, 0.5)), -1.4, 0.9 + 0.42, 0);
        put(s, new T.Mesh(new T.BoxGeometry(0.66, 0.66, 0.66), matte(WHITE)), 0, 1.4 + 0.33, 0).rotation.y = Math.PI / 4;
        put(s, new T.Mesh(new T.ConeGeometry(0.38, 0.9, 96), matte(BLUE, 0.5)), 1.4, 0.6 + 0.45, 0);
        return { scene: s, cams: [cam(2.8, 4.4, 6.0, 0, 1.0, 0, 28), cam(-3.8, 3.6, 3.0, -0.6, 0.9, 0, 30), cam(0.6, 3.0, 2.4, 0, 1.6, 0, 26)] };
      },
      '003': () => {
        const s = studio(0x232327, 1.2);
        [WHITE, WHITE, GRAY, BLUE, WHITE].forEach((hex, i) => {
          put(s, new T.Mesh(new T.BoxGeometry(2.3, 0.1, 1.5), matte(hex, 0.55)), 0, 0.3 + i * 0.36, 0).rotation.y = i * 0.12 - 0.24;
        });
        return { scene: s, cams: [cam(3.6, 4.6, 5.2, 0, 1.0, 0), cam(0.01, 8, 1.4, 0, 0.8, 0, 32), cam(-3.2, 2.6, 2.0, 0, 1.2, 0, 26)] };
      },
      '004': () => {
        const s = studio(0xdad8d3);
        put(s, new T.Mesh(new T.TorusGeometry(1.25, 0.26, 48, 160, Math.PI), matte(0xf3f1ec)), 0, 0, 0);
        put(s, new T.Mesh(new T.SphereGeometry(0.5, 64, 32), matte(BLUE, 0.45)), 0, 0.5, -0.25);
        put(s, new T.Mesh(new T.SphereGeometry(0.18, 48, 24), matte(GRAY, 0.5)), 1.75, 0.18, 0.1);
        return { scene: s, cams: [cam(2.4, 3.8, 6.0, 0, 1.0, 0, 26), cam(-3.4, 2.8, 3.2, 0, 0.9, 0, 26), cam(0.01, 7.5, 2.0, 0, 0.5, 0, 34)] };
      }
    };
    const coverScenes = {};
    const shotCache = {};
    const idle = window.requestIdleCallback ? (f) => requestIdleCallback(f, { timeout: 500 }) : (f) => setTimeout(f, 30);
    function shot(id, idx, w, h) {
      const key = id + ':' + idx + ':' + w + 'x' + h;
      if (shotCache[key]) return shotCache[key];
      shotCache[key] = new Promise((resolve) => {
        idle(() => {
          if (lost || !COVERS[id]) { resolve(null); return; }
          const c = coverScenes[id] || (coverScenes[id] = COVERS[id]());
          const camera = c.cams[idx] || c.cams[0];
          const aspect = w / h;
          const back = aspect < 4 / 3 ? Math.min(1.7, (4 / 3) / aspect * 0.85) : 1;
          const { from, look } = camera.userData;
          camera.position.copy(look).addScaledVector(from.clone().sub(look), back);
          camera.lookAt(look);
          camera.aspect = aspect;
          camera.updateProjectionMatrix();
          ensure(w, h);
          renderer.setScissorTest(true);
          renderer.setViewport(0, 0, w, h);
          renderer.setScissor(0, 0, w, h);
          renderer.render(c.scene, camera);
          const out = document.createElement('canvas');
          out.width = w;
          out.height = h;
          out.getContext('2d').drawImage(glCanvas, 0, glH - h, w, h, 0, 0, w, h);
          resolve(out.toDataURL('image/jpeg', 0.88));
        });
      });
      return shotCache[key];
    }

    /* ---------- Laço de renderização ---------- */
    let last = performance.now();
    function frame(now) {
      requestAnimationFrame(frame);
      if (lost) return;
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      const adt = state.motion ? dt : 0;
      stepPointer(dt);
      for (const v of views) {
        if (!v.visible || !v.w) continue;
        v.update(dt, adt);
        ensure(v.w, v.h);
        renderer.setScissorTest(true);
        renderer.setViewport(0, 0, v.w, v.h);
        renderer.setScissor(0, 0, v.w, v.h);
        renderer.render(v.scene, v.camera);
        v.ctx.clearRect(0, 0, v.w, v.h);
        v.ctx.drawImage(glCanvas, 0, glH - v.h, v.w, v.h, 0, 0, v.w, v.h);
        if (!v.drawn) { v.drawn = true; v.el.classList.add('on'); }
      }
    }
    requestAnimationFrame(frame);

    return { shot, setStep: (i) => process.set(i) };
  }
})();
