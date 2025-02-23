import { FaInstagram, FaPlane, FaPaperclip } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import logo from './assets/Sem_Titulo-2.png';
import marcelo from './assets/image.png';
import tatto from './assets/Sem_Titulo-3.png';
import footerImg from './assets/Sem_Titulo-4.png';
import { useState } from "react";
import { texts as texts2 } from "./infos";
import axios from "axios";

// Template de e-mail (mantido, com layout já existente)
export const emailTemplate = ({ nome, email, country, mensagem }) =>  `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Novo Contato Recebido</title>
  <style>
    /* Reseta margens e espaçamentos básicos */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      background-color: #f9f9f9;
      color: #333333;
      -webkit-font-smoothing: antialiased;
      line-height: 1.6;
      padding: 30px 0;
    }

    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }

    .header {
      background: #fafafa;
      padding: 30px 20px;
      text-align: center;
      border-bottom: 1px solid #eeeeee;
    }

    .header h1 {
      color: #111111;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 5px;
    }

    .header p {
      color: #666666;
      font-size: 14px;
      margin-top: 6px;
    }

    .content {
      padding: 30px 20px;
    }

    .content h2 {
      font-size: 18px;
      color: #111111;
      margin-bottom: 16px;
      border-bottom: 1px solid #eeeeee;
      padding-bottom: 8px;
      letter-spacing: 0.5px;
    }

    .content p {
      margin-bottom: 16px;
      font-size: 15px;
      color: #555555;
      line-height: 1.5;
    }

    .content p strong {
      color: #111111;
      font-weight: 600;
    }

    .footer {
      background: #fafafa;
      text-align: center;
      padding: 20px;
      border-top: 1px solid #eeeeee;
      font-size: 13px;
      color: #999999;
    }

    @media (max-width: 600px) {
      .container {
        width: 90%;
      }

      .header h1 {
        font-size: 20px;
      }

      .content h2 {
        font-size: 16px;
      }

      .content p {
        font-size: 14px;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h1>Novo contato recebido</h1>
      <p>Confira abaixo as informações enviadas pelo seu formulário.</p>
    </div>

    <div class="content">
      <h2>Detalhes do Contato</h2>
      <p>
        <strong>Nome:</strong> ${nome}
      </p>
      <p>
        <strong>E-mail:</strong> ${email}
      </p>
      <p>
        <strong>País:</strong> ${country}
      </p>
      <p>
        <strong>Mensagem:</strong><br />
        ${mensagem}
      </p>
    </div>

    <div class="footer">
      <p>Esta é uma mensagem automática. Por favor, não responda diretamente a este e-mail.</p>
    </div>
  </div>
</body>
</html>
`;

function App() {
  const [filesList, setFilesList] = useState([]);
  const [hasSendForm, setHasSendForm] = useState(false);

  const pathname = window.location.pathname.split('/')[1];

  const currentPath = () => {
    switch (pathname.toLowerCase()) {
      case 'pt':
        return 'PT';
      case 'ita':
        return 'ITA';
      case 'eng':
        return 'ENG';
      default:
        return 'PT';
    }
  }

  function redirectToInstagram() {
    window.open('https://www.instagram.com/mcapocci/', '_blank');
  }

  // Função para remover arquivo individual
  const removeFile = (index) => {
    setFilesList(prevList => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
  };

  async function handleSendForm(e) {
    e.preventDefault();

    const formData = new FormData();
    filesList.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    const html = emailTemplate({
      nome: e.target.name.value,
      email: e.target.email.value,
      country: e.target.country.value,
      mensagem: e.target.message.value
    });

    formData.append('html', html);
    formData.append('email', "contact@mcapocci.com");
    formData.append('subject', 'Novo Contato');

    try {
      await axios.post('https://mailapi.mcapocci.com', formData, {
        headers: {
          'Authorization': 'Bearer Lp4Wg87DwIXAGVrM6fTgx3bh',
          'Content-Type': 'multipart/form-data'
        }
      });
      
      e.target.reset();
      setFilesList([]);
      setHasSendForm(true);

    } catch (error) {
      console.error('Erro ao enviar formulário: ', error);
    }
  }

  const texts = texts2[currentPath().toLowerCase()];

  return (
    <div className="w-full bg-white text-black font-sans min-h-screen">
      
      {/* Navbar / Header */}
      <header className="flex items-center justify-between py-4 px-4 md:px-8 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          {/* Logo na Navbar */}
          <img 
            src={logo} 
            alt="Tattoo Studio Logo" 
            className="w-[50px] h-auto cursor-pointer"
            onClick={() => window.location.href = '/'}
          />
          <div className="hidden md:flex items-center gap-8 text-gray-800 text-sm">
            <a 
              href="#about"
              className="hover:text-black transition-colors"
            >
              {texts.header.title}
            </a>
            <a
              href="#calendar"
              className="hover:text-black transition-colors"
            >
              {texts.calendar.title}
            </a>
            <a
              href="#contact"
              className="hover:text-black transition-colors"
            >
              {texts.form.title}
            </a>
          </div>
        </div>

        {/* Idiomas e Instagram */}
        <div className="flex items-center gap-6">
          <div className="flex gap-2 text-gray-600 text-xs md:text-sm">
            <a 
              href="/PT"
              className={`cursor-pointer hover:text-black transition-colors ${currentPath() === "PT" && 'font-bold text-black'}`}
            >
              PT
            </a>
            <a 
              href="/ITA"
              className={`cursor-pointer hover:text-black transition-colors ${currentPath() === "ITA" && 'font-bold text-black'}`}
            >
              ITA
            </a>
            <a 
              href="/ENG"
              className={`cursor-pointer hover:text-black transition-colors ${currentPath() === "ENG" && 'font-bold text-black'}`}
            >
              ENG
            </a>
          </div>
          <FaInstagram 
            size={20} 
            onClick={redirectToInstagram} 
            className="cursor-pointer text-gray-600 hover:text-black transition-colors"
          />
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-8 pb-12 px-4 bg-cover bg-center">
        <div className="max-w-2xl text-center space-y-4">
          <img 
            src={logo} 
            alt={texts.header.instagramAlt} 
            className="mx-auto w-[120px] md:w-[150px]" 
          />
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            {texts.header.title}
          </h1>
          <p className="text-sm md:text-lg text-gray-600">
            {texts.header.subtitle}
          </p>
        </div>

        {/* Vídeo embed */}
        <div className="w-full max-w-[800px] mt-6 md:mt-10">
          <div className="relative w-full h-0 pb-[56.25%]"> 
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-md"
              src="https://www.youtube.com/embed/0p3g-ql4BAc?si=sOKcFqTga7HFNnck"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* Botão de CTA para formulário */}
        <div className="mt-8">
          <button
            className="bg-red-600 hover:bg-red-700 transition-colors text-white py-2 px-6 rounded-full font-semibold"
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            {texts.form.title}
          </button>
        </div>
      </section>

      {/* Calendário */}
      <section id="calendar" className="py-12 px-4 border-t border-gray-200 bg-white">
        <h2 className="text-center text-2xl md:text-4xl font-bold mb-8 text-gray-800">{texts.calendar.title}</h2>
        
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="border border-gray-300 rounded-xl flex items-center gap-4 py-4 px-6 transition hover:bg-gray-100">
            <FaPlane size={35} className="text-red-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{texts.calendar.firenze.title}</h3>
              <p className="text-red-400 font-medium">{texts.calendar.firenze.status}</p>
            </div>
          </div>

          <div className="border border-gray-300 rounded-xl flex items-center gap-4 py-4 px-6 transition hover:bg-gray-100">
            <IoMdHome size={35} className="text-red-600" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{texts.calendar.saoPaulo.title}</h3>
              <p className="text-red-400 font-medium">{texts.calendar.saoPaulo.status}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button 
            className="bg-red-600 hover:bg-red-700 transition-colors text-white py-3 px-6 rounded-full font-medium"
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
          >
            {texts.calendar.button}
          </button>
        </div>
      </section>

      {/* Seção Sobre (imagem e descrição sempre lado a lado) */}
      <section id="about" className="py-12 px-4 border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto flex flex-row flex-wrap items-start gap-4">
          {/* Imagem à esquerda */}
          <img
            src={marcelo}
            alt="Marcelo Capocci"
            className="w-[150px] sm:w-[200px] h-auto object-cover rounded-md"
          />
          {/* Texto à direita */}
          <div className="flex-1 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {texts.about.marcelo.name}
            </h2>
            <p className="text-gray-700 text-sm md:text-lg whitespace-pre-line">
              {texts.about.marcelo.bio}
            </p>
          </div>
        </div>
      </section>

      {/* Seção Formulário / Tattoo imagem */}
      <section id="contact" className="py-12 px-4 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-8">
          {/* Imagem destacada (sem borda) */}
          <div className="md:w-1/2 w-full flex justify-center">
            <img
              src={tatto}
              alt="Tattoo"
              className="w-full md:w-auto h-auto object-contain rounded-md"
            />
          </div>
          
          {/* Formulário */}
          <div className="md:w-1/2 w-full">
            <div className="text-center space-y-2">
              <p className="text-xl font-light text-red-600">{texts.form.year}</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{texts.form.title}</h2>
              <p className="text-gray-600 text-sm md:text-lg px-2">{texts.form.description}</p>
            </div>

            <form 
              className="mt-8 space-y-5"
              onSubmit={handleSendForm}
            >
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {texts.form.nameLabel} <Star/>
                </label>
                <input 
                  type="text"
                  name="name"
                  required
                  placeholder={texts.form.placeholders.name}
                  className="w-full border border-gray-300 bg-white p-3 rounded-md outline-none text-gray-800 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {texts.form.emailLabel} <Star/>
                </label>
                <input 
                  type="email"
                  name="email"
                  required
                  placeholder={texts.form.placeholders.email}
                  className="w-full border border-gray-300 bg-white p-3 rounded-md outline-none text-gray-800 placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {texts.form.messageLabel} <Star/>
                </label>
                <textarea 
                  name="message"
                  rows="4"
                  required
                  placeholder={texts.form.placeholders.message}
                  className="w-full border border-gray-300 bg-white p-3 rounded-md outline-none text-gray-800 placeholder-gray-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {texts.form.locationLabel} <Star/>
                </label>
                <select
                  name="country"
                  className="w-full border border-gray-300 bg-white p-3 rounded-md text-gray-800"
                >
                  <option value="SP">{texts.form.locations.sp}</option>
                  <option value="ITALIA">{texts.form.locations.italy}</option>
                </select>
              </div>

              {/* Upload de arquivos */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  {texts.form.attachmentLabel} <Star/>
                </label>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="text-red-400">{texts.form.attachmentDescription1}</span>
                  {texts.form.attachmentDescription2}
                </p>
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-2 py-2 px-4 border border-gray-300 rounded-md cursor-pointer text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <FaPaperclip size={16} />
                  <span>{texts.form.attachButton}</span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={(e) => {
                    const newFiles = Array.from(e.target.files);
                    if (filesList.length + newFiles.length > 4) {
                      alert(texts.alert.fileMax);
                      e.target.value = null;
                    } else {
                      setFilesList(prevFiles => [...prevFiles, ...newFiles]);
                    }
                  }}
                />
                
                {/* Lista de arquivos */}
                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {filesList.map((file, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <span>{file.name}</span>
                      <button
                        type="button"
                        className="text-red-400 hover:text-red-500"
                        onClick={() => removeFile(index)}
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botão de enviar */}
              <div className="pt-4">
                {hasSendForm ? (
                  <button
                    type="submit"
                    disabled
                    className="w-full bg-gray-300 cursor-not-allowed text-gray-600 py-3 px-4 rounded-md font-semibold"
                  >
                    {texts.form.submitSuccess}
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 transition-colors py-3 px-4 rounded-md font-semibold text-white"
                    onClick={() => {
                      if (filesList.length < 1) {
                        alert(texts.alert.fileSelect);
                      }
                    }}
                  >
                    {texts.form.submitButton}
                  </button>
                )}
                {hasSendForm && (
                  <p className="text-sm text-center mt-2 text-gray-500">
                    {texts.form.submitNote}
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-12 pb-6 px-4 md:px-8 bg-white border-t border-gray-200 text-center">
        <div className="flex flex-col items-center gap-4">
          <img
            src={logo}
            alt={texts.footer.instagramAlt}
            className="w-20 h-auto mx-auto"
          />
          <p className="text-lg font-semibold text-gray-800">{texts.header.title}</p>
          <p className="text-gray-500">{texts.footer.email}</p>
          <FaInstagram
            size={25}
            className="text-gray-600 hover:text-black transition-colors cursor-pointer"
            onClick={redirectToInstagram}
          />
        </div>
        <div className="mt-8">
          <img
            src={footerImg}
            alt="Footer"
            className="w-full object-cover md:hidden"
          />
        </div>
      </footer>
    </div>
  );
}

function Star(){
  return <span className="text-red-400">*</span>;
}

export default App;
