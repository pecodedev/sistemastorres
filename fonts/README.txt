Tipografias del sitio
=====================

Estos archivos se sirven desde el propio dominio en vez de Google Fonts,
para evitar dependencias externas y no exponer las IPs de los visitantes
a un tercero.

  dm-sans.woff2          DM Sans (variable 400-700) - texto general
  dm-sans-italic.woff2   DM Sans italica 400        - cita del perfil
  jetbrains-mono.woff2   JetBrains Mono (400-500)   - etiquetas y codigo
  syne.woff2             Syne (600-700)             - logotipo del header

Todas incluyen unicamente el subconjunto "latin", suficiente para el
castellano (acentos, enie, signos de apertura).

Licencia
--------
Las tres familias estan publicadas bajo la SIL Open Font License 1.1,
cuyo texto completo esta en OFL.txt. La licencia permite usarlas y
redistribuirlas en un sitio web; exige conservar el aviso de licencia,
que es el motivo por el que ese archivo acompana a las fuentes.

  DM Sans        (c) Colophon Foundry, Jonny Pinhorn, Indian Type Foundry
  JetBrains Mono (c) JetBrains s.r.o.
  Syne           (c) Bonjour Monde, Lucas Descroix

Como se actualizan
------------------
Se descargaron desde fonts.gstatic.com pidiendo el CSS de Google con un
User-Agent moderno y quedandose con los bloques @font-face del subset
latin. Las declaraciones @font-face viven al principio de styles.css.
