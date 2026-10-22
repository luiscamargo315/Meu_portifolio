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
      tags: 'React · API · Charts', role: 'Design de interface e front-end',
      desc: 'Painel interativo de métricas em tempo real com gráficos dinâmicos e filtros avançados.',
      context: 'Quem acompanha indicadores todos os dias precisa entender rápido o que mudou. O desafio foi organizar muitos números em uma tela que mostra primeiro o essencial e deixa o detalhe a um clique.',
      process: [
        'Listei as perguntas que o painel precisava responder e ordenei por frequência de uso.',
        'Prototipei a hierarquia no Figma com dados de exemplo e testei a leitura em telas pequenas.',
        'Construí os componentes em React, consumindo uma API REST com atualização em tempo real.'
      ],
      solution: 'Gráficos dinâmicos, filtros por período e por categoria, e estados de carregamento e de vazio desenhados com o mesmo cuidado da tela principal.',
      figs: ['Colunas em cerâmica: os dados como volume', 'Vista superior: a grade de leitura', 'Detalhe: o indicador em destaque']
    },
    {
      id: '002', title: 'E-commerce Redesign', category: 'Redesign · Mobile', year: '2025',
      tags: 'UI/UX · Figma · CSS', role: 'Pesquisa, UX/UI e guia de estilo',
      desc: 'Redesign completo de loja virtual com foco em conversão e experiência mobile.',
      context: 'A loja funcionava, mas a compra pelo celular tinha passos demais e pouca clareza sobre preço e entrega. O foco foi simplificar o caminho até o checkout.',
      process: [
        'Mapeei o fluxo de compra atual e marquei cada ponto de dúvida.',
        'Redesenhei vitrine, página de produto e carrinho pensando primeiro no celular.',
        'Documentei o sistema visual em CSS para manter a consistência entre as páginas.'
      ],
      solution: 'Vitrine com fotos maiores, preço e frete sempre visíveis e um checkout em menos etapas.',
      figs: ['Vitrine: três objetos, três pedestais', 'Vista lateral: a hierarquia dos produtos', 'Detalhe: o cubo de vidro']
    },
    {
      id: '003', title: 'App de Gestão', category: 'Aplicação web', year: '2024',
      tags: 'Node.js · MongoDB · Full-stack', role: 'Desenvolvimento full-stack e interface',
      desc: 'Aplicação web para gestão de tarefas com autenticação, dashboard e notificações.',
      context: 'Equipes pequenas costumam espalhar tarefas entre planilhas e mensagens. A proposta foi reunir tudo em um só lugar, com acesso seguro para cada pessoa.',
      process: [
        'Modelei os dados de projetos, tarefas e usuários no MongoDB.',
        'Criei a API em Node.js com autenticação e permissões por usuário.',
        'Desenhei o dashboard e as notificações para mostrar primeiro o que vence antes.'
      ],
      solution: 'Login seguro, painel com as prioridades do dia, notificações de prazo e organização por projeto.',
      figs: ['Camadas empilhadas: dados, regras e interface', 'Vista superior: o deslocamento entre camadas', 'Detalhe: a camada de vidro']
    },
    {
      id: '004', title: 'Landing Page Startup', category: 'Landing page', year: '2024',
      tags: 'HTML · GSAP · Design', role: 'Direção de arte, animação e desenvolvimento',
      desc: 'Página de apresentação com animações fluidas, scroll storytelling e formulário de captação.',
      context: 'Uma startup precisava apresentar o produto em poucos segundos e captar os primeiros contatos interessados.',
      process: [
        'Escrevi a narrativa da página em blocos curtos, do problema à solução.',
        'Animei cada bloco com GSAP para revelar a história no ritmo da rolagem.',
        'Integrei um formulário de captação simples, com validação no navegador.'
      ],
      solution: 'Uma página leve, com scroll storytelling, animações fluidas e um formulário de captação direto ao ponto.',
      figs: ['Arco e esfera: o lançamento', 'Vista lateral: a esfera atrás do arco', 'Vista superior: a composição completa']
    }
  ];

  const STEPS = [
    {
      title: 'Pesquisa',
      text: 'Entender antes de desenhar. Converso com quem vai usar, levanto referências e mapeio o que já existe.',
      list: ['Mapa de referências', 'Perguntas-chave do projeto', 'Objetivos e restrições'],
      fig: 'Fig. 05.1 — Estrutura em arame: o problema ainda aberto'
    },
    {
      title: 'Direção',
      text: 'Escolher um caminho. Defino conceito, tipografia, cor e movimento, e testo a direção em poucas telas antes de escalar.',
      list: ['Conceito visual', 'Moodboard e sistema tipográfico', 'Protótipo de baixa fidelidade'],
      fig: 'Fig. 05.2 — Três volumes alinhados: um sistema'
    },
    {
      title: 'Criação',
      text: 'Construir o sistema completo: componentes, interações e código. Design e desenvolvimento andam juntos.',
      list: ['Interface final', 'Componentes reutilizáveis', 'Animações e interações'],
      fig: 'Fig. 05.3 — Forma líquida: o material ganha vida'
    },
    {
      title: 'Entrega',
      text: 'Publicar com cuidado. Reviso performance, acessibilidade e responsividade, documento e acompanho os primeiros ajustes.',
      list: ['Site publicado', 'Documentação', 'Ajustes pós-lançamento'],
      fig: 'Fig. 05.4 — Esfera polida sobre base: a peça pronta'
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
  const pad2 = (n) => String(n).padStart(2, '0');
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

  /* ================= SEQUÊNCIA DE ENTRADA ================= */
  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 900))]).then(() => {
    requestAnimationFrame(() => doc.classList.add('ready'));
  });

  /* ================= TEMA ================= */
  const themeBtn = $('#theme-toggle');
  const savedTheme = store.get('theme');
  if (savedTheme === 'light' || savedTheme === 'dark') doc.dataset.theme = savedTheme;
  const isDark = () => (doc.dataset.theme ? doc.dataset.theme === 'dark' : darkMQ.matches);
  function syncThemeBtn() {
    themeBtn.setAttribute('aria-label', isDark() ? 'Ativar tema claro' : 'Ativar tema escuro');
  }
  themeBtn.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    doc.dataset.theme = next;
    store.set('theme', next);
    syncThemeBtn();
  });
  syncThemeBtn();

  /* ================= MOVIMENTO ================= */
  const motionBtn = $('#motion-toggle');
  function applyMotion() {
    doc.classList.toggle('still', !state.motion);
    motionBtn.setAttribute('aria-pressed', String(!state.motion));
    motionBtn.setAttribute('aria-label', state.motion ? 'Pausar animações' : 'Retomar animações');
    motionBtn.innerHTML = state.motion
      ? '<span class="label">Pausar</span><span aria-hidden="true"> ❚❚</span>'
      : '<span class="label">Animar</span><span aria-hidden="true"> ▶</span>';
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

  /* ================= TONS E SEÇÃO ATIVA ================= */
  const sections = $$('main section[id]');
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
  sections.forEach((s) => toneIO.observe(s));

  /* ================= REVELAÇÃO AO ROLAR ================= */
  if (state.motion) {
    const revealIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.remove('pre');
        revealIO.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.01 });
    const vh = innerHeight;
    $$('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top > vh * 0.92) {
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
        const p = clamp((now - start) / 1400, 0, 1);
        nums.forEach((n) => { n.textContent = Math.round(easeOut(p) * Number(n.dataset.count)); });
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    cIO.observe(statsEl);
  }

  /* ================= PONTEIRO E COORDENADAS ================= */
  const coords = $('#coords');
  let coordQueued = false;
  addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch') return;
    state.px = (e.clientX / innerWidth) * 2 - 1;
    state.py = -((e.clientY / innerHeight) * 2 - 1);
    if (!coordQueued) {
      coordQueued = true;
      requestAnimationFrame(() => {
        coordQueued = false;
        coords.textContent = 'X ' + ((state.px + 1) / 2).toFixed(3) + ' · Y ' + ((1 - state.py) / 2).toFixed(3);
      });
    }
  }, { passive: true });

  /* ================= ROLAGEM: CABEÇALHO E PARALLAX ================= */
  const heroGrid = $('.hero-grid');
  const heroEl = $('#inicio');
  const parallaxImgs = $$('.work .cover img');
  let scrollQueued = false;
  function onScrollFrame() {
    scrollQueued = false;
    const y = scrollY;
    header.classList.toggle('scrolled', y > 8);
    if (!state.motion) return;
    const vh = innerHeight;
    heroGrid.style.setProperty('--hp', clamp(y / Math.max(1, heroEl.offsetHeight), 0, 1).toFixed(3));
    for (const img of parallaxImgs) {
      const r = img.parentElement.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) continue;
      const c = (r.top + r.height / 2 - vh / 2) / vh;
      img.style.setProperty('--py', (c * -5).toFixed(2) + '%');
    }
  }
  addEventListener('scroll', () => {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(onScrollFrame); }
  }, { passive: true });
  onScrollFrame();

  /* ================= GALERIA: CHIP QUE SEGUE O CURSOR ================= */
  $$('.work-media').forEach((m) => {
    const chip = $('.work-chip', m);
    m.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      const r = m.getBoundingClientRect();
      chip.style.setProperty('--cx', (e.clientX - r.left + 14) + 'px');
      chip.style.setProperty('--cy', (e.clientY - r.top + 14) + 'px');
    });
  });

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
      $$('#lab-mats button, #lab-morph, #lab-reset').forEach((b) => { b.disabled = true; });
    }
    engineQueue.splice(0).forEach((fn) => fn(Engine));
  }
  if (document.readyState === 'complete') setTimeout(boot3D, 60);
  else addEventListener('load', () => setTimeout(boot3D, 60));

  /* ================= CAPAS DA GALERIA ================= */
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
    const steps = p.process.map((s) => '<li>' + s + '</li>').join('');
    return (
      '<header class="pj-head">' +
        '<p class="mono">Projeto ' + p.id + ' — demonstrativo</p>' +
        '<h2 id="pj-title">' + p.title + '</h2>' +
        '<dl class="pj-meta mono">' +
          '<div><dt>Categoria</dt><dd>' + p.category + '</dd></div>' +
          '<div><dt>Ano</dt><dd>' + p.year + '</dd></div>' +
          '<div><dt>Tecnologias</dt><dd>' + p.tags + '</dd></div>' +
          '<div><dt>Papel</dt><dd>' + p.role + '</dd></div>' +
        '</dl>' +
      '</header>' +
      '<figure class="pj-fig pj-hero"><div class="cover" data-cover="' + p.id + '" data-size="1600x900" style="--ar: 16 / 9"><img alt="' + p.figs[0] + '" hidden></div>' +
        '<figcaption class="mono">Fig. ' + p.id + '.1 — ' + p.figs[0] + '</figcaption></figure>' +
      '<p class="pj-lead">' + p.desc + '</p>' +
      '<div class="pj-cols">' +
        '<section><h3 class="mono">Contexto</h3><p>' + p.context + '</p></section>' +
        '<section><h3 class="mono">Processo</h3><ol>' + steps + '</ol></section>' +
        '<section><h3 class="mono">Solução</h3><p>' + p.solution + '</p></section>' +
      '</div>' +
      '<figure class="pj-fig pj-a"><div class="cover" data-cover="' + p.id + '" data-size="1200x900" style="--ar: 4 / 3"><img alt="' + p.figs[1] + '" hidden></div>' +
        '<figcaption class="mono">Fig. ' + p.id + '.2 — ' + p.figs[1] + '</figcaption></figure>' +
      '<figure class="pj-fig pj-b"><div class="cover" data-cover="' + p.id + '" data-size="900x1125" style="--ar: 4 / 5"><img alt="' + p.figs[2] + '" hidden></div>' +
        '<figcaption class="mono">Fig. ' + p.id + '.3 — ' + p.figs[2] + '</figcaption></figure>' +
      '<nav class="pj-next" aria-label="Próximo projeto"><span class="mono">Próximo projeto — ' + next.id + '</span>' +
        '<a href="#projeto-' + next.id + '">' + next.title + ' <span class="arrow" aria-hidden="true">→</span></a></nav>' +
      '<p class="pj-note mono">Projeto demonstrativo. As imagens são esculturas 3D renderizadas no navegador para este portfólio.</p>'
    );
  }

  function openProject(id) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) return;
    clearTimeout(closeTimer);
    if (!returnFocus) returnFocus = document.activeElement;
    currentProject = id;
    pjBody.innerHTML = projectHTML(p);
    $('#pj-count').textContent = p.id + ' / ' + pad2(PROJECTS.length).padStart(3, '0');
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
    if (state.motion && !reduceMQ.matches) closeTimer = setTimeout(done, 900);
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
    $('#step-k').textContent = 'Etapa ' + pad2(i + 1) + ' / ' + pad2(STEPS.length);
    $('#step-title').textContent = s.title;
    $('#step-text').textContent = s.text;
    $('#step-list').innerHTML = s.list.map((x) => '<li>' + x + '</li>').join('');
    $('#step-fig').textContent = s.fig;
  }
  function selectStep(i, focus) {
    if (i === stepIndex) { if (focus) tabs[i].focus(); return; }
    stepIndex = i;
    tabs.forEach((t, k) => {
      t.setAttribute('aria-selected', String(k === i));
      t.tabIndex = k === i ? 0 : -1;
    });
    if (focus) tabs[i].focus();
    stepPanel.setAttribute('aria-labelledby', tabs[i].id);
    stepsEl.style.setProperty('--i', i);
    clearTimeout(stepTimer);
    if (state.motion) {
      stepPanel.classList.add('out');
      stepTimer = setTimeout(() => { fillStep(i); stepPanel.classList.remove('out'); }, 240);
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
      if (selectEl) {
        const r = document.createRange();
        r.selectNodeContents(selectEl);
        const sel = getSelection();
        sel.removeAllRanges();
        sel.addRange(r);
        say('Selecionado — Ctrl+C');
      } else {
        say('Não foi possível copiar');
      }
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
    const message = $('#message').value.trim();
    draft = message + '\n\n— ' + name + ' (' + email + ')';
    $('#form-mailto').href = 'mailto:' + CONFIG.email +
      '?subject=' + encodeURIComponent('Contato pelo portfólio — ' + name) +
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
     CENA 3D — um único renderizador WebGL desenha todas as vistas
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
    renderer.toneMapping = T.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
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

    /* ---------- Ambiente de estúdio (reflexos) ---------- */
    const env = (function makeEnv() {
      const s = new T.Scene();
      const dome = new T.Mesh(
        new T.SphereGeometry(10, 32, 16),
        new T.ShaderMaterial({
          side: T.BackSide,
          vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
          fragmentShader: 'varying vec3 vP; void main(){ float h = normalize(vP).y * 0.5 + 0.5; vec3 c = mix(vec3(0.05,0.05,0.06), vec3(0.62,0.63,0.66), smoothstep(0.15, 0.95, h)); gl_FragColor = vec4(c, 1.0); }'
        })
      );
      s.add(dome);
      const box = (w, h, x, y, z, k, hex) => {
        const m = new T.Mesh(new T.PlaneGeometry(w, h), new T.MeshBasicMaterial({ color: new T.Color(hex).multiplyScalar(k), side: T.DoubleSide }));
        m.position.set(x, y, z);
        m.lookAt(0, 0, 0);
        s.add(m);
      };
      box(7, 3, 0, 7.5, 1.5, 3.2, 0xffffff);
      box(2.2, 7, -7.5, 1, 3, 2.4, 0xffffff);
      box(2.2, 6, 7.5, 0.5, -2, 1.4, 0xe4e8ff);
      box(5, 1.2, 0, -1.5, 8, 0.7, 0x8fa2ff);
      const pm = new T.PMREMGenerator(renderer);
      const tex = pm.fromScene(s, 0.02).texture;
      pm.dispose();
      return tex;
    })();

    /* ---------- Sombra de contato suave ---------- */
    const shadowTex = (function () {
      const c = document.createElement('canvas');
      c.width = c.height = 128;
      const g = c.getContext('2d');
      const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
      grd.addColorStop(0, 'rgba(0,0,0,0.55)');
      grd.addColorStop(0.5, 'rgba(0,0,0,0.22)');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = grd;
      g.fillRect(0, 0, 128, 128);
      return new T.CanvasTexture(c);
    })();
    function contactShadow(size, opacity) {
      const m = new T.Mesh(
        new T.PlaneGeometry(size, size),
        new T.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, opacity: opacity, toneMapped: false })
      );
      m.rotation.x = -Math.PI / 2;
      return m;
    }

    /* ---------- Ruído e deformação líquida (GLSL) ---------- */
    const NOISE = [
      'vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}',
      'vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}',
      'vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}',
      'vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}',
      'float snoise(vec3 v){',
      ' const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);',
      ' vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);',
      ' vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);',
      ' vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;',
      ' i=mod289(i);',
      ' vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));',
      ' float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;',
      ' vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);',
      ' vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);',
      ' vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);',
      ' vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));',
      ' vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;',
      ' vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);',
      ' vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));',
      ' p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;',
      ' vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;',
      ' return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));',
      '}'
    ].join('\n');
    const DISPLACE = [
      'uniform float uTime; uniform float uAmp; uniform float uFreq;',
      NOISE,
      'float liquidField(vec3 n){',
      ' float f = snoise(n*uFreq + vec3(0.0, uTime*0.18, uTime*0.11));',
      ' f += 0.45*snoise(n*uFreq*2.1 + vec3(uTime*0.07, 0.0, -uTime*0.12));',
      ' return f;',
      '}',
      'vec3 liquidDisplace(vec3 p){ vec3 n = normalize(p); return p + n * liquidField(n) * uAmp; }'
    ].join('\n');
    const BEGIN_NORMAL = [
      'vec3 objectNormal = vec3(normal);',
      '#ifdef USE_TANGENT',
      'vec3 objectTangent = vec3(tangent.xyz);',
      '#endif',
      'vec3 liquidP = liquidDisplace(position);',
      '{',
      ' vec3 ln = normalize(position);',
      ' vec3 lt = normalize(cross(ln, abs(ln.y) > 0.95 ? vec3(1.0,0.0,0.0) : vec3(0.0,1.0,0.0)));',
      ' vec3 lb = normalize(cross(ln, lt));',
      ' float le = 0.012;',
      ' vec3 pt = liquidDisplace(position + lt*le);',
      ' vec3 pb = liquidDisplace(position + lb*le);',
      ' objectNormal = normalize(cross(pt - liquidP, pb - liquidP));',
      '}'
    ].join('\n');

    function liquidUniforms(amp, freq) {
      return { uTime: { value: 0 }, uAmp: { value: amp }, uFreq: { value: freq } };
    }
    function liquidMaterial(params, u) {
      const m = new T.MeshPhysicalMaterial(params);
      m.onBeforeCompile = (sh) => {
        sh.uniforms.uTime = u.uTime;
        sh.uniforms.uAmp = u.uAmp;
        sh.uniforms.uFreq = u.uFreq;
        sh.vertexShader = DISPLACE + '\n' + sh.vertexShader
          .replace('#include <beginnormal_vertex>', BEGIN_NORMAL)
          .replace('#include <begin_vertex>', 'vec3 transformed = liquidP;');
      };
      m.customProgramCacheKey = () => 'liquid';
      return m;
    }

    /* ---------- Materiais ---------- */
    const ceramic = (hex, rough) => new T.MeshPhysicalMaterial({ color: hex, roughness: rough == null ? 0.72 : rough, metalness: 0, clearcoat: 0.12, clearcoatRoughness: 0.6 });
    const metal = (hex, rough) => new T.MeshPhysicalMaterial({ color: hex || 0xd4d6da, roughness: rough == null ? 0.14 : rough, metalness: 1 });
    const glassMat = () => new T.MeshPhysicalMaterial({ color: 0xdde4ff, roughness: 0.04, metalness: 0, transparent: true, opacity: 0.34, clearcoat: 1, envMapIntensity: 2.2 });
    const iridescent = () => ({ color: 0xdedfe4, metalness: 1, roughness: 0.17, iridescence: 1, iridescenceIOR: 1.35, iridescenceThicknessRange: [180, 640], clearcoat: 0.4, clearcoatRoughness: 0.12, envMapIntensity: 1.25 });

    /* ---------- Escultura (hero e contato) ---------- */
    function sculpture(detail) {
      const root = new T.Group();
      const tilt = new T.Group();
      const spin = new T.Group();
      root.add(tilt);
      tilt.add(spin);
      const u = liquidUniforms(0.17, 0.8);
      const blob = new T.Mesh(new T.IcosahedronGeometry(1.2, detail), liquidMaterial(iridescent(), u));
      spin.add(blob);
      const ring = new T.Mesh(new T.TorusGeometry(1.78, 0.017, 12, 240), metal(0xb7b9bf, 0.22));
      ring.rotation.set(1.18, 0.28, 0);
      tilt.add(ring);
      const moon = new T.Mesh(new T.SphereGeometry(0.15, 32, 16), ceramic(0x0033ff, 0.5));
      ring.add(moon);
      const shadow = contactShadow(3.6, 0.42);
      shadow.position.y = -1.85;
      root.add(shadow);
      return { root, tilt, spin, blob, ring, moon, shadow, u };
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
    function baseScene() {
      const scene = new T.Scene();
      scene.environment = env;
      const key = new T.DirectionalLight(0xffffff, 1.1);
      key.position.set(3, 4, 5);
      scene.add(key);
      return { scene, key };
    }

    /* Ponteiro com mola: peso e inércia, sem seguir o cursor ao pé da letra */
    const P = { x: 0, y: 0, vx: 0, vy: 0 };
    function stepPointer(dt) {
      const k = 9, c = 4.6;
      P.vx += ((state.px - P.x) * k - P.vx * c) * dt;
      P.vy += ((state.py - P.y) * k - P.vy * c) * dt;
      P.x += P.vx * dt;
      P.y += P.vy * dt;
    }

    /* ----- Hero ----- */
    (function heroView() {
      const { scene, key } = baseScene();
      const camera = new T.PerspectiveCamera(32, 1, 0.1, 50);
      const S = sculpture(lowPower ? 28 : 56);
      scene.add(S.root);
      const rim = new T.PointLight(0x9fb0ff, 0.6, 20);
      rim.position.set(-4, 1, -3);
      scene.add(rim);
      const base = { x: 0.7, y: 0.12, s: 1 };
      let intro = 0;
      addView('hero', {
        scene, camera,
        layout(aspect) {
          const hh = Math.tan(T.MathUtils.degToRad(camera.fov / 2)) * 7.5;
          const hw = hh * aspect;
          S.shadow.visible = aspect >= 0.95;
          if (aspect < 0.95) {
            base.x = 0; base.y = hh * 0.36; base.s = clamp(hw / 2.1, 0.45, 0.85);
          } else {
            base.x = Math.min(hw * 0.2, 1.3); base.y = 0.3; base.s = clamp(hw / 3.7, 0.6, 0.98);
          }
        },
        update(dt, adt, t) {
          if (doc.classList.contains('ready')) intro = state.motion ? Math.min(1, intro + dt / 1.8) : 1;
          const r = heroEl.getBoundingClientRect();
          const p = clamp(-r.top / Math.max(1, r.height), 0, 1);
          this.el.style.opacity = String(1 - p * 0.75);
          const e = easeOut(intro);
          S.u.uTime.value = t * 0.55;
          S.spin.rotation.y += adt * 0.09;
          S.tilt.rotation.y = lerp(S.tilt.rotation.y, P.x * 0.38, damp(3, dt));
          S.tilt.rotation.x = lerp(S.tilt.rotation.x, -P.y * 0.24, damp(3, dt));
          S.ring.rotation.z += adt * 0.05;
          const a = t * 0.42;
          S.moon.position.set(Math.cos(a) * 1.78, Math.sin(a) * 1.78, 0);
          const float = Math.sin(t * (Math.PI * 2 / 9)) * 0.08;
          S.root.position.set(base.x, base.y + float + p * 1.1 + (1 - e) * -0.25, 0);
          S.root.scale.setScalar(base.s * (0.84 + 0.16 * e) * (1 - p * 0.1));
          S.shadow.position.y = -1.85 - float;
          S.shadow.material.opacity = 0.42 * e;
          camera.position.set(-P.x * 0.35, P.y * 0.22, 7.5);
          camera.lookAt(0, 0, 0);
          key.position.set(3 + P.x * 2.4, 4 - P.y * 1.4, 5);
        }
      });
    })();

    /* ----- Playground ----- */
    const lab = (function labView() {
      const stage = $('#lab-stage');
      const hint = $('#stage-hint');
      const { scene } = baseScene();
      const camera = new T.PerspectiveCamera(30, 1, 0.1, 50);
      camera.position.set(0, 0.25, 7.2);
      camera.lookAt(0, -0.05, 0);
      const group = new T.Group();
      group.scale.setScalar(0.92);
      scene.add(group);

      const u = liquidUniforms(0.07, 0.8);
      const geo = new T.IcosahedronGeometry(1.15, lowPower ? 32 : 64);
      const mat = liquidMaterial({ color: 0xe7e5e0, roughness: 0.78, metalness: 0, clearcoat: 0.05, clearcoatRoughness: 0.5, iridescence: 0.001, iridescenceIOR: 1.35, iridescenceThicknessRange: [180, 640], transparent: true, opacity: 1, envMapIntensity: 0.9 }, u);
      const mesh = new T.Mesh(geo, mat);
      group.add(mesh);

      const N = lowPower ? 1800 : 4200;
      const pos = new Float32Array(N * 3);
      const rnd = new Float32Array(N);
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2;
        const rr = Math.sqrt(1 - y * y);
        const th = golden * i;
        pos[i * 3] = Math.cos(th) * rr * 1.15;
        pos[i * 3 + 1] = y * 1.15;
        pos[i * 3 + 2] = Math.sin(th) * rr * 1.15;
        rnd[i] = Math.random();
      }
      const pGeo = new T.BufferGeometry();
      pGeo.setAttribute('position', new T.BufferAttribute(pos, 3));
      pGeo.setAttribute('aRand', new T.BufferAttribute(rnd, 1));
      const pMat = new T.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: u.uTime, uAmp: u.uAmp, uFreq: u.uFreq,
          uSpread: { value: 0 }, uSize: { value: 15 * DPR }, uAlpha: { value: 0 },
          uColor: { value: new T.Color(0xe9e8e4).convertLinearToSRGB() }
        },
        vertexShader: [
          DISPLACE,
          'uniform float uSpread; uniform float uSize; attribute float aRand; varying float vA;',
          'void main(){',
          ' vec3 n = normalize(position);',
          ' vec3 p = liquidDisplace(position);',
          ' p += n * uSpread * (0.25 + aRand * 0.9);',
          ' p += vec3(sin(uTime*0.7 + aRand*40.0), cos(uTime*0.6 + aRand*30.0), sin(uTime*0.5 + aRand*20.0)) * uSpread * 0.12;',
          ' vec4 mv = modelViewMatrix * vec4(p, 1.0);',
          ' gl_Position = projectionMatrix * mv;',
          ' gl_PointSize = uSize * (0.5 + aRand) / -mv.z;',
          ' vA = 0.5 + 0.5 * aRand;',
          '}'
        ].join('\n'),
        fragmentShader: [
          'uniform vec3 uColor; uniform float uAlpha; varying float vA;',
          'void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard;',
          ' gl_FragColor = vec4(uColor, smoothstep(0.5, 0.15, d) * uAlpha * vA); }'
        ].join('\n')
      });
      const points = new T.Points(pGeo, pMat);
      points.visible = false;
      group.add(points);

      const ringMat = new T.LineBasicMaterial({ color: 0xe9e8e4, transparent: true, opacity: 0.14, toneMapped: false });
      [1.35, 1.85, 2.35].forEach((rad) => {
        const pts = [];
        for (let i = 0; i <= 128; i++) {
          const a = (i / 128) * Math.PI * 2;
          pts.push(new T.Vector3(Math.cos(a) * rad, 0, Math.sin(a) * rad));
        }
        const line = new T.Line(new T.BufferGeometry().setFromPoints(pts), ringMat);
        line.position.y = -1.55;
        scene.add(line);
      });

      const MATS = {
        ceramic: { label: 'Cerâmica fosca', color: 0xe7e5e0, roughness: 0.78, metalness: 0, clearcoat: 0.05, iridescence: 0.001, opacity: 1, env: 0.9 },
        glass: { label: 'Vidro translúcido', color: 0xc9d3ff, roughness: 0.04, metalness: 0, clearcoat: 1, iridescence: 0.001, opacity: 0.3, env: 2.4 },
        metal: { label: 'Metal polido', color: 0xd2d4d8, roughness: 0.12, metalness: 1, clearcoat: 0.3, iridescence: 0.001, opacity: 1, env: 1.3 },
        iris: { label: 'Iridescente', color: 0xe6e6ea, roughness: 0.18, metalness: 1, clearcoat: 0.4, iridescence: 1, opacity: 1, env: 1.3 }
      };
      const STATES = [
        { name: 'Repouso', amp: 0.07, freq: 0.8, spread: 0, solid: 1 },
        { name: 'Fluxo', amp: 0.34, freq: 1.25, spread: 0, solid: 1 },
        { name: 'Dispersão', amp: 0.2, freq: 1.1, spread: 1, solid: 0 }
      ];
      let matKey = 'ceramic';
      let target = MATS.ceramic;
      const tColor = new T.Color(target.color);
      let si = 0;
      let solid = 1;
      let spread = 0;
      let matOpacity = 1;

      let dragging = false, lastX = 0, lastY = 0, lastT = 0;
      let vx = 0, vy = 0, resetting = false;
      const qTmp = new T.Quaternion();
      const AX = new T.Vector3(1, 0, 0), AY = new T.Vector3(0, 1, 0);
      const qIdentity = new T.Quaternion();
      function rotate(dx, dy) {
        qTmp.setFromAxisAngle(AY, dx); group.quaternion.premultiply(qTmp);
        qTmp.setFromAxisAngle(AX, dy); group.quaternion.premultiply(qTmp);
      }
      function hideHint() { hint.classList.add('gone'); }
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
        if (performance.now() - lastT > 90) { vx = vy = 0; }
      };
      stage.addEventListener('pointerup', endDrag);
      stage.addEventListener('pointercancel', endDrag);
      stage.addEventListener('keydown', (e) => {
        const k = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
        if (!k) return;
        e.preventDefault();
        resetting = false;
        vy += k[0] * 1.6; vx += k[1] * 1.6;
        hideHint();
      });

      const matBtns = $$('#lab-mats button');
      matBtns.forEach((b) => b.addEventListener('click', () => setMaterial(b.dataset.mat)));
      function setMaterial(k) {
        matKey = k;
        target = MATS[k];
        tColor.set(target.color);
        matBtns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mat === k)));
        $('#ro-mat').textContent = target.label;
      }
      const nextEl = $('#lab-next');
      function setState(i) {
        si = i;
        $('#ro-state').textContent = pad2(i + 1) + ' ' + STATES[i].name;
        nextEl.textContent = '→ ' + STATES[(i + 1) % STATES.length].name;
      }
      $('#lab-morph').addEventListener('click', () => setState((si + 1) % STATES.length));
      $('#lab-reset').addEventListener('click', () => {
        setMaterial('ceramic');
        setState(0);
        vx = vy = 0;
        resetting = true;
      });
      $('#ro-vert').textContent = geo.attributes.position.count.toLocaleString('pt-BR');

      const rotEl = $('#ro-rot');
      const euler = new T.Euler();
      let readT = 0;

      addView('lab', {
        scene, camera,
        update(dt, adt, t) {
          u.uTime.value = t * 0.6;
          const s = STATES[si];
          const kk = damp(3.2, dt);
          u.uAmp.value = lerp(u.uAmp.value, s.amp, kk);
          u.uFreq.value = lerp(u.uFreq.value, s.freq, kk);
          solid = lerp(solid, s.solid, damp(3.6, dt));
          spread = lerp(spread, s.spread, damp(2.4, dt));

          const km = damp(4, dt);
          mat.color.lerp(tColor, km);
          mat.roughness = lerp(mat.roughness, target.roughness, km);
          mat.metalness = lerp(mat.metalness, target.metalness, km);
          mat.clearcoat = lerp(mat.clearcoat, target.clearcoat, km);
          mat.iridescence = Math.max(0.001, lerp(mat.iridescence, target.iridescence, km));
          mat.envMapIntensity = lerp(mat.envMapIntensity, target.env, km);
          matOpacity = lerp(matOpacity, target.opacity, km);
          mesh.visible = solid > 0.01;
          mat.opacity = matOpacity * solid;
          mesh.scale.setScalar(0.92 + 0.08 * solid);
          points.visible = spread > 0.01 || solid < 0.99;
          pMat.uniforms.uSpread.value = spread;
          pMat.uniforms.uAlpha.value = 1 - solid;

          if (resetting) {
            group.quaternion.slerp(qIdentity, damp(4, dt));
            if (group.quaternion.angleTo(qIdentity) < 0.002) { group.quaternion.identity(); resetting = false; }
          } else if (!dragging) {
            rotate(vy * dt, vx * dt);
            const f = Math.exp(-2.6 * dt);
            vx *= f; vy *= f;
            if (adt) rotate(adt * 0.16, 0);
          }

          readT += dt;
          if (readT > 0.12) {
            readT = 0;
            euler.setFromQuaternion(group.quaternion, 'YXZ');
            rotEl.textContent = 'X ' + Math.round(T.MathUtils.radToDeg(euler.x)) + '° · Y ' + Math.round(T.MathUtils.radToDeg(euler.y)) + '°';
          }
        }
      });
      return { mat };
    })();

    /* ----- Sobre: anel de cerâmica ----- */
    (function studioView() {
      const { scene, key } = baseScene();
      key.intensity = 1.4;
      const camera = new T.PerspectiveCamera(30, 1, 0.1, 50);
      camera.position.set(0, 0.6, 7);
      camera.lookAt(0, 0, 0);
      const torus = new T.Mesh(new T.TorusGeometry(1, 0.36, lowPower ? 40 : 72, lowPower ? 96 : 180), ceramic(0xefede9, 0.64));
      scene.add(torus);
      const shadow = contactShadow(3.4, 0.5);
      shadow.position.y = -1.6;
      scene.add(shadow);
      const el = $('[data-view="studio"]');
      let spin = 0;
      addView('studio', {
        scene, camera,
        update(dt, adt, t) {
          const r = el.getBoundingClientRect();
          const p = clamp((innerHeight - r.top) / (innerHeight + r.height), 0, 1);
          spin += adt * 0.12;
          torus.rotation.set(0.85 + p * 1.1, spin + p * 0.6, 0.25);
          torus.position.y = Math.sin(t * (Math.PI * 2 / 10)) * 0.06;
        }
      });
    })();

    /* ----- Processo: um objeto por etapa ----- */
    const process = (function processView() {
      const { scene, key } = baseScene();
      key.intensity = 1.3;
      const camera = new T.PerspectiveCamera(30, 4 / 3, 0.1, 50);
      camera.position.set(0, 1.0, 7.2);
      camera.lookAt(0, -0.05, 0);
      const groups = [];

      const wire = new T.Group();
      const ico = new T.IcosahedronGeometry(1.15, 1);
      wire.add(new T.LineSegments(new T.EdgesGeometry(ico), new T.LineBasicMaterial({ color: 0x2f55ff, toneMapped: false })));
      const seen = new Set();
      const nodeGeo = new T.SphereGeometry(0.05, 16, 8);
      const nodeMat = metal(0xc9cbd0, 0.2);
      const pa = ico.attributes.position;
      for (let i = 0; i < pa.count; i++) {
        const k = pa.getX(i).toFixed(3) + pa.getY(i).toFixed(3) + pa.getZ(i).toFixed(3);
        if (seen.has(k)) continue;
        seen.add(k);
        const n = new T.Mesh(nodeGeo, nodeMat);
        n.position.set(pa.getX(i), pa.getY(i), pa.getZ(i));
        wire.add(n);
      }
      groups.push(wire);

      const trio = new T.Group();
      const c1 = new T.Mesh(new T.BoxGeometry(0.8, 0.8, 0.8), ceramic(0xefede9));
      c1.position.x = -1.3;
      const c2 = new T.Mesh(new T.CylinderGeometry(0.42, 0.42, 0.8, 64), ceramic(0xefede9));
      const c3 = new T.Mesh(new T.SphereGeometry(0.44, 48, 24), ceramic(0x0033ff, 0.5));
      c3.position.x = 1.3;
      trio.add(c1, c2, c3);
      groups.push(trio);

      const liquidU = liquidUniforms(0.3, 1.1);
      const blob = new T.Mesh(new T.IcosahedronGeometry(1.0, lowPower ? 24 : 44), liquidMaterial(iridescent(), liquidU));
      const blobG = new T.Group();
      blobG.add(blob);
      groups.push(blobG);

      const done = new T.Group();
      const plinth = new T.Mesh(new T.CylinderGeometry(0.95, 0.95, 0.5, 96), ceramic(0xefede9, 0.8));
      plinth.position.y = -0.95;
      const orb = new T.Mesh(new T.SphereGeometry(0.72, 64, 32), metal(0xd6d8dc, 0.08));
      orb.position.y = 0.02;
      done.add(plinth, orb);
      groups.push(done);

      const shadow = contactShadow(3.4, 0.38);
      shadow.position.y = -1.25;
      scene.add(shadow);

      const ks = [1, 0, 0, 0];
      groups.forEach((g, i) => { g.scale.setScalar(i === 0 ? 1 : 0.001); g.visible = i === 0; scene.add(g); });
      let active = 0;
      addView('process', {
        scene, camera,
        update(dt, adt, t) {
          liquidU.uTime.value = t * 0.6;
          groups.forEach((g, i) => {
            ks[i] = lerp(ks[i], i === active ? 1 : 0, damp(5, dt));
            const e = easeOut(clamp(ks[i], 0, 1));
            g.visible = ks[i] > 0.003;
            g.scale.setScalar(Math.max(0.001, e));
            g.rotation.y += adt * 0.18 + (1 - e) * dt * 2.2;
          });
          trio.position.y = Math.sin(t * 0.8) * 0.04;
          shadow.material.opacity = 0.38 * (1 - ks[0] * 0.6);
        }
      });
      return { set(i) { active = i; } };
    })();

    /* ----- Contato: a escultura em miniatura ----- */
    (function contactView() {
      const { scene } = baseScene();
      const camera = new T.PerspectiveCamera(30, 1, 0.1, 50);
      camera.position.set(0, 0.3, 8);
      camera.lookAt(0, 0, 0);
      const S = sculpture(lowPower ? 24 : 40);
      S.root.scale.setScalar(0.92);
      S.shadow.visible = false;
      S.ring.rotation.set(1.3, -0.4, 0);
      scene.add(S.root);
      addView('contact', {
        scene, camera,
        update(dt, adt, t) {
          S.u.uTime.value = t * 0.5 + 40;
          S.spin.rotation.y += adt * 0.12;
          S.ring.rotation.z -= adt * 0.06;
          const a = -t * 0.36;
          S.moon.position.set(Math.cos(a) * 1.78, Math.sin(a) * 1.78, 0);
          S.tilt.rotation.y = lerp(S.tilt.rotation.y, P.x * 0.3, damp(2.5, dt));
          S.tilt.rotation.x = lerp(S.tilt.rotation.x, -P.y * 0.2, damp(2.5, dt));
          S.root.position.y = Math.sin(t * (Math.PI * 2 / 11)) * 0.08;
        }
      });
    })();

    /* ---------- Capas dos projetos: esculturas renderizadas uma vez ---------- */
    function studio(floorHex, keyI) {
      const scene = new T.Scene();
      scene.environment = env;
      const floor = new T.Mesh(new T.PlaneGeometry(90, 90), new T.MeshStandardMaterial({ color: floorHex, roughness: 0.94, metalness: 0, envMapIntensity: 0.55 }));
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      scene.add(floor);
      const key = new T.DirectionalLight(0xffffff, keyI || 1.5);
      key.position.set(-4, 7, 4);
      key.castShadow = true;
      key.shadow.mapSize.set(2048, 2048);
      key.shadow.bias = -0.0004;
      Object.assign(key.shadow.camera, { left: -5, right: 5, top: 5, bottom: -5, near: 1, far: 22 });
      scene.add(key);
      scene.add(new T.HemisphereLight(0xffffff, floorHex, 0.35));
      return scene;
    }
    function add(scene, mesh, x, y, z) {
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      return mesh;
    }
    function cam(px, py, pz, lx, ly, lz, fov) {
      const c = new T.PerspectiveCamera(fov || 30, 1, 0.1, 120);
      c.position.set(px, py, pz);
      c.lookAt(lx, ly, lz);
      return c;
    }
    const COVERS = {
      '001': () => {
        const s = studio(0xc6c9d0);
        const hs = [0.6, 1.1, 0.8, 1.6, 1.2, 2.1, 1.5];
        hs.forEach((h, i) => add(s, new T.Mesh(new T.BoxGeometry(0.42, h, 0.42), i === 5 ? ceramic(0x0033ff, 0.5) : ceramic(0xf0eee9)), (i - 3) * 0.62, h / 2, 0));
        return { scene: s, cams: [cam(3.2, 5.2, 5.6, 0.1, 0.7, 0), cam(0.01, 9, 2.4, 0, 0, 0, 34), cam(-1.8, 2.8, 2.8, 1.2, 0.9, 0, 30)] };
      },
      '002': () => {
        const s = studio(0xe1ddd5);
        [[-1.4, 0.9], [0, 1.4], [1.4, 0.6]].forEach(([x, h]) => add(s, new T.Mesh(new T.CylinderGeometry(0.55, 0.55, h, 96), ceramic(0xf4f2ed, 0.8)), x, h / 2, 0));
        add(s, new T.Mesh(new T.SphereGeometry(0.42, 64, 32), metal(0xd4d6da, 0.1)), -1.4, 0.9 + 0.42, 0);
        const cube = add(s, new T.Mesh(new T.BoxGeometry(0.66, 0.66, 0.66), glassMat()), 0, 1.4 + 0.33, 0);
        cube.rotation.y = Math.PI / 4;
        add(s, new T.Mesh(new T.ConeGeometry(0.38, 0.9, 96), ceramic(0x0033ff, 0.5)), 1.4, 0.6 + 0.45, 0);
        return { scene: s, cams: [cam(2.8, 4.4, 6.0, 0, 1.0, 0, 28), cam(-3.8, 3.6, 3.0, -0.6, 0.9, 0, 30), cam(0.6, 3.0, 2.4, 0, 1.6, 0, 26)] };
      },
      '003': () => {
        const s = studio(0x1b1b1e, 3.2);
        const rim = new T.DirectionalLight(0x9fb0ff, 1.2);
        rim.position.set(3, 3, -5);
        s.add(rim);
        s.add(new T.AmbientLight(0xffffff, 0.35));
        const frosted = glassMat();
        frosted.roughness = 0.35;
        frosted.opacity = 0.5;
        frosted.envMapIntensity = 0.8;
        const mats = [ceramic(0xf4f2ee, 0.6), ceramic(0xf4f2ee, 0.6), ceramic(0xf4f2ee, 0.6), ceramic(0x1f4bff, 0.45), frosted];
        mats.forEach((m, i) => {
          const slab = add(s, new T.Mesh(new T.BoxGeometry(2.3, 0.1, 1.5), m), 0, 0.3 + i * 0.36, 0);
          slab.rotation.y = i * 0.12 - 0.24;
        });
        return { scene: s, cams: [cam(3.6, 4.6, 5.2, 0, 1.0, 0), cam(0.01, 8, 1.4, 0, 0.8, 0, 32), cam(-3.2, 2.6, 2.0, 0, 1.2, 0, 26)] };
      },
      '004': () => {
        const s = studio(0xd8d6d1);
        add(s, new T.Mesh(new T.TorusGeometry(1.25, 0.26, 48, 160, Math.PI), ceramic(0xf2f0eb, 0.7)), 0, 0, 0);
        add(s, new T.Mesh(new T.SphereGeometry(0.5, 64, 32), ceramic(0x0033ff, 0.45)), 0, 0.5, -0.25);
        add(s, new T.Mesh(new T.SphereGeometry(0.18, 48, 24), metal(0xd4d6da, 0.1)), 1.9, 0.18, 0.8);
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
          camera.aspect = w / h;
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
    let time = 0;
    function frame(now) {
      requestAnimationFrame(frame);
      if (lost) return;
      const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
      last = now;
      const adt = state.motion ? dt : 0;
      time += adt;
      stepPointer(dt);
      for (const v of views) {
        if (!v.visible || !v.w) continue;
        v.update(dt, adt, time);
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

    return {
      shot,
      setStep: (i) => process.set(i),
      lab
    };
  }
})();
