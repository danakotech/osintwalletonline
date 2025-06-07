# 🛡️ Verificador de Wallets Blockchain (OSINT)

Aplicación web desarrollada con **Next.js + Tailwind CSS** para realizar análisis OSINT básico sobre direcciones de billeteras (wallets) en la red Ethereum. La herramienta compara la dirección introducida por el usuario con una **base de datos de direcciones denunciadas por actividad sospechosa** o phishing, mantenida por el proyecto [ScamSniffer](https://github.com/scamsniffer/scam-database). Utiliza un algoritmo de comprobaciones por transaccion e intercatuación de contratos y patrones de uso para evaluar la fiabilidad de la dirección.

---

## 🚀 Funcionalidad - 

- 🧾 Permite introducir una dirección de wallet Ethereum (`0x...`).
- 🔍 Realiza una búsqueda directa en la lista negra actualizada diariamente desde [scamsniffer/scam-database](https://github.com/scamsniffer/scam-database).
- ❗ Si la dirección está denunciada, muestra una alerta roja que advierte al usuario.
- ✅ Si no está en la lista, informa que no hay reportes negativos en la base pública.

---

## 🖥️ Tecnologías usadas

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [`address.json`](https://raw.githubusercontent.com/scamsniffer/scam-database/main/blacklist/address.json) de ScamSniffer como fuente de datos OSINT

---

## 📦 Instalación local

\`\`\`bash

cd verificador-wallets-osint
npm install
npm run dev

https://github.com/danakotech/osintwalletonline.git
Demo: criptocurrencia.com
