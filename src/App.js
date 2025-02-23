import { FaInstagram, FaPlane, FaPaperclip } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import logo from './assets/Sem_Titulo-2.png';
import marcelo from './assets/image.png';
import tatto from './assets/Sem_Titulo-3.png'
import footerImg from './assets/Sem_Titulo-4.png'
import { useState } from "react";
import { texts as texts2 } from "./infos";
import axios from "axios";


export const emailTemplate = ({ nome, email, country, mensagem }) =>  `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mensagem de Contato</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      padding: 10px 0;
      border-bottom: 1px solid #dddddd;
    }
    .content {
      padding: 20px 0;
    }
    .footer {
      text-align: center;
      padding: 10px 0;
      border-top: 1px solid #dddddd;
      font-size: 12px;
      color: #888888;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nova Mensagem de Contato</h1>
    </div>
    <div class="content">
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>País:</strong> ${country}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${mensagem}</p>
    </div>
    <div class="footer">
      <p>Esta é uma mensagem automática, por favor, não responda.</p>
    </div>
  </div>
</body>
</html>
`

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
    return window.location.href = 'https://www.instagram.com/mcapocci/';
  }

  function handleSendForm(e) {
    const formData = new FormData();
    filesList.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    const html = emailTemplate({
      nome: e.target.name.value,
      email: e.target.email.value,
      country: e.target.country.value,
      mensagem: e.target.message.value
    })

    formData.append('html', html);
    formData.append('email', "contact@mcapocci.com");
    formData.append('subject', 'Novo Contato');

    e.preventDefault();
    try {
      axios.post('https://mailapi.mcapocci.com', formData, {
        headers: {
          'Authorization': 'Bearer Lp4Wg87DwIXAGVrM6fTgx3bh',
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('Success:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

      e.target.reset();
      setFilesList([]);
      
      setHasSendForm(true);
    } catch (error) {
      
    }
  }

  const texts = texts2[currentPath().toLowerCase()];

return (
  <div className="w-full max-w-[1000px] mx-auto">
    <div className="flex justify-between px-8 items-center pt-8">
      <FaInstagram size={25} onClick={redirectToInstagram} className="cursor-pointer" />
      <div className="flex gap-2 text-gray-600">
        <a href="/PT" className={`cursor-pointer ${currentPath() === "PT" && 'font-bold underline'}`}>PT</a>
        <a href="/ITA" className={`cursor-pointer ${currentPath() === "ITA" && 'font-bold underline'}`}>ITA</a>
        <a href="/ENG" className={`cursor-pointer ${currentPath() === "ENG" && 'font-bold underline'}`}>ENG</a>
      </div>
    </div>

    <div className="h-8" />

    <div className="text-center">
      <img src={logo} alt={texts.header.instagramAlt} className="mx-auto" />
      <div className="h-4" />
      <h1 className="text-xl">{texts.header.title}</h1>
      <div className="h-4" />
      <h2 className="text-center text-gray-500 text-sm md:text-lg px-8 md:px-0">{texts.header.subtitle}</h2>
      <div className="h-4" />
      <div className="relative">
        <iframe
          width="100%"
          src="https://www.youtube.com/embed/0p3g-ql4BAc?si=sOKcFqTga7HFNnck"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full object-cover h-[250px] md:h-[450px]"
        ></iframe>
      </div>
    </div>

    <div className="h-8" />

    <div className="w-full px-8">
      <h1 className="text-center text-xl">{texts.calendar.title}</h1>
      <div className="h-8" />
      <div className="border-2 rounded-full flex gap-4 items-center py-2 px-4 text-gray-500 max-w-[350px] mx-auto">
        <FaPlane size={35} />
        <div>
          <h1 className="text-xl">{texts.calendar.firenze.title}</h1>
          <p className="text-red-700 font-semibold">{texts.calendar.firenze.status}</p>
        </div>
      </div>
      <div className="h-4" />
      <div className="border-2 rounded-full flex gap-4 items-center py-2 px-4 text-gray-500 max-w-[350px] mx-auto">
        <IoMdHome size={35} />
        <div>
          <h1 className="text-xl">{texts.calendar.saoPaulo.title}</h1>
          <p className="text-red-700 font-semibold">{texts.calendar.saoPaulo.status}</p>
        </div>
      </div>
      <div className="h-8" />
      <div className="w-full flex justify-center">
        <button 
          className="bg-gray-200 text-gray-600 py-2 px-4 mx-auto"
          onClick={() => document.getElementById('contact-form-scroll-point').scrollIntoView({ behavior: 'smooth' })}
        >
          {texts.calendar.button}
        </button>
      </div>
      <div className="h-8" />
      <div className="h-0.5 bg-gray-300" />
    </div>

    <div className="h-8" />

    <div className="w-full flex gap-8 md:gap-8 flex-col md:flex-row">
      <div className="w-full px-8">
        <h1 className="text-3xl text-gray-700">{texts.about.title}</h1>
        <div className="h-4" />
        <p className="text-gray-500 text-sm md:text-lg whitespace-pre-line">{texts.about.description}</p>
      </div>
      <div className="w-full px-8 flex gap-6">
        <img src={marcelo} alt="Marcelo Capocci" className="w-1/2 object-cover rounded-br-[90px]" />
        <div className="w-1/2">
          <h1 className="text-3xl text-gray-700">{texts.about.marcelo.name}</h1>
          <div className="h-2" />
          <p className="text-gray-500 text-sm md:text-lg whitespace-pre-line">{texts.about.marcelo.bio}</p>
        </div>
      </div>
    </div>

    <div className="h-16" />
    <div className="h-16 hidden Md:block" />

    <div className="w-full flex gap-8 md:gap-8 flex-col md:flex-row">
      <img src={tatto} alt="Tattoo" className="w-full mx-auto object-cover my-4" />
      <div className="w-full px-8" id="contact-form-scroll-point">
        <p className="text-center text-3xl font-light">{texts.form.year}</p>
        <p className="text-center text-3xl my-4">{texts.form.title}</p>
        <p className="text-center text-sm md:text-lg">{texts.form.description}</p>
        <div className="h-8" />
        <form action="" id="contact-form" className="flex flex-col" onSubmit={handleSendForm}>
          <label htmlFor="" className="text-gray-600">{texts.form.nameLabel} <Start/></label>
          <input type="text" placeholder={texts.form.placeholders.name} name="name" className="border p-2 rounded" required />
          <div className="h-4" />
          <label htmlFor="" className="text-gray-600">{texts.form.emailLabel} <Start/></label>
          <input type="email" placeholder={texts.form.placeholders.email} name="email" className="border p-2 rounded" required />
          <div className="h-4" />
          <label htmlFor="" className="text-gray-600">{texts.form.messageLabel} <Start/></label>
          <textarea placeholder={texts.form.placeholders.message} name="message" className="border p-2 rounded" rows="4" required></textarea>
          <div className="h-4" />
          <label htmlFor="" className="text-gray-600">{texts.form.locationLabel} <Start/></label>
          <select className="border p-2 rounded bg-gray-200 text-gray-600" name="country">
            <option value="SP">{texts.form.locations.sp}</option>
            <option value="ITALIA">{texts.form.locations.italy}</option>
          </select>
          <div className="h-4" />
          <div className="flex flex-col items-center gap-1">
            <label htmlFor="" className="text-gray-600 self-start">{texts.form.attachmentLabel} <Start/></label>
            <p className="text-sm text-gray-600">
              <span className="text-red-600">{texts.form.attachmentDescription1}</span>
              {texts.form.attachmentDescription2}
            </p>
            <div className="h-4" />
            <p className="text-gray-600 text-sm">{texts.form.attachmentNote}</p>
            <label className="flex items-center py-2 px-8 border cursor-pointer text-sm gap-2 text-gray-500"  htmlFor="file-upload">
              <FaPaperclip size={20} className="text-gray-400" />
              <p>{texts.form.attachButton}</p>
            </label>
            <input
              id="file-upload"
              type="file"
              className="border-none hidden"
              accept="image/*"
              multiple
              required
              onError={() => alert(texts.alert.fileError)}
              onChange={(e) => {
                const files = Array.from(e.target.files);
                if (files.length > 4) {
                  alert(texts.alert.fileMax);
                  e.target.value = null;
                } else {
                  setFilesList(files);
                }
              }}
            />
            <ul className="text-gray-600 text-sm self-start">
              {filesList.map((file, index) => (
                <li key={index} className="py-1">{file.name}</li>
              ))}
            </ul>
          </div>
          <div className="h-4" />
          {
            hasSendForm
            ? <button type="submit" disabled className="text-white bg-cyan-400 py-2 px-4 cursor-not-allowed font-semibold">{texts.form.submitSuccess}</button>
            : <button type="submit" className="bg-gray-200 text-gray-600 py-2 px-4" onClick={() => filesList.length < 1 && alert(texts.alert.fileSelect)}>{texts.form.submitButton}</button>
          }
          {hasSendForm && <p className="text-sm text-center mt-1 text-gray-600">{texts.form.submitNote}</p>}
        </form>
      </div>
    </div>

    <div className="w-full px-8 flex flex-col gap-2 py-16">
      <img src={logo} alt={texts.footer.instagramAlt} className="mx-auto" />
      <p className="text-center text-gray-700">{texts.header.title}</p>
      <p className="text-center text-gray-500">{texts.footer.email}</p>
      <FaInstagram size={25} className="mx-auto cursor-pointer" onClick={redirectToInstagram}/>
    </div>

    <img src={footerImg} alt="Footer" className="w-full object-cover md:hidden" />
  </div>
);
}


function Start(){
  return (
    <span className="text-red-500">*</span>
  )
}
export default App;
