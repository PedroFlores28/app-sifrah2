'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BrandingPanel from '../components/BrandingPanel';
import SocialIcons from '../components/SocialIcons';
import { FaEye, FaEyeSlash, FaPhone, FaEnvelope, FaCalendar, FaPaperPlane, FaChevronDown } from 'react-icons/fa';

export default function RegistroPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    documento: '',
    menorEdad: false,
    nombre: '',
    apellido: '',
    celular: '',
    correo: '',
    fechaNacimiento: '',
    departamento: '',
    provincia: '',
    distrito: '',
    contraseña: '',
    codigoPatrocinador: '',
    terminos: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terminos) {
      alert('Debes aceptar los términos de uso');
      return;
    }
    // Aquí iría la lógica de registro
    console.log('Registro:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData({
      ...formData,
      [name]: checked !== undefined ? checked : value,
      // Si cambia el departamento, limpiar provincia y distrito
      ...(name === 'departamento' && { provincia: '', distrito: '' }),
      // Si cambia la provincia, limpiar distrito
      ...(name === 'provincia' && { distrito: '' }),
    });
  };


  const departamentos = [
    'Amazonas', 'Ancash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca',
    'Callao', 'Cusco', 'Huancavelica', 'Huánuco', 'Ica', 'Junín',
    'La Libertad', 'Lambayeque', 'Lima', 'Loreto', 'Madre de Dios', 'Moquegua',
    'Pasco', 'Piura', 'Puno', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali'
  ];

  const provinciasPorDepartamento: { [key: string]: string[] } = {
    'Amazonas': ['Chachapoyas', 'Bagua', 'Bongará', 'Condorcanqui', 'Luya', 'Rodríguez de Mendoza', 'Utcubamba'],
    'Ancash': ['Huaraz', 'Aija', 'Antonio Raymondi', 'Asunción', 'Bolognesi', 'Carhuaz', 'Carlos Fermín Fitzcarrald', 'Casma', 'Corongo', 'Huari', 'Huarmey', 'Huaylas', 'Mariscal Luzuriaga', 'Ocros', 'Pallasca', 'Pomabamba', 'Recuay', 'Santa', 'Sihuas', 'Yungay'],
    'Apurímac': ['Abancay', 'Andahuaylas', 'Antabamba', 'Aymaraes', 'Chincheros', 'Cotabambas', 'Grau'],
    'Arequipa': ['Arequipa', 'Camaná', 'Caravelí', 'Castilla', 'Caylloma', 'Condesuyos', 'Islay', 'La Unión'],
    'Ayacucho': ['Huamanga', 'Cangallo', 'Huanca Sancos', 'Huanta', 'La Mar', 'Lucanas', 'Parinacochas', 'Paucar del Sara Sara', 'Sucre', 'Victor Fajardo', 'Vilcas Huamán'],
    'Cajamarca': ['Cajamarca', 'Cajabamba', 'Celendín', 'Chota', 'Contumazá', 'Cutervo', 'Hualgayoc', 'Jaén', 'San Ignacio', 'San Marcos', 'San Miguel', 'San Pablo', 'Santa Cruz'],
    'Callao': ['Callao', 'Bellavista', 'Carmen de la Legua Reynoso', 'La Perla', 'La Punta', 'Ventanilla'],
    'Cusco': ['Cusco', 'Acomayo', 'Anta', 'Calca', 'Canas', 'Canchis', 'Chumbivilcas', 'Espinar', 'La Convención', 'Paruro', 'Paucartambo', 'Quispicanchi', 'Urubamba'],
    'Huancavelica': ['Huancavelica', 'Acobamba', 'Angaraes', 'Castrovirreyna', 'Churcampa', 'Huaytará', 'Tayacaja'],
    'Huánuco': ['Huánuco', 'Ambo', 'Dos de Mayo', 'Huacaybamba', 'Huamalíes', 'Leoncio Prado', 'Marañón', 'Pachitea', 'Puerto Inca', 'Lauricocha', 'Yarowilca'],
    'Ica': ['Ica', 'Chincha', 'Nazca', 'Palpa', 'Pisco'],
    'Junín': ['Huancayo', 'Concepción', 'Chanchamayo', 'Jauja', 'Junín', 'Satipo', 'Tarma', 'Yauli', 'Chupaca'],
    'La Libertad': ['Trujillo', 'Ascope', 'Bolívar', 'Chepén', 'Gran Chimú', 'Julcán', 'Otuzco', 'Pacasmayo', 'Pataz', 'Sánchez Carrión', 'Santiago de Chuco', 'Virú'],
    'Lambayeque': ['Chiclayo', 'Ferreñafe', 'Lambayeque'],
    'Lima': ['Lima', 'Barranca', 'Cajatambo', 'Canta', 'Cañete', 'Huaral', 'Huarochirí', 'Huaura', 'Oyón', 'Yauyos'],
    'Loreto': ['Maynas', 'Alto Amazonas', 'Datem del Marañón', 'Loreto', 'Mariscal Ramón Castilla', 'Putumayo', 'Requena', 'Ucayali'],
    'Madre de Dios': ['Tambopata', 'Manu', 'Tahuamanu'],
    'Moquegua': ['Mariscal Nieto', 'General Sánchez Cerro', 'Ilo'],
    'Pasco': ['Pasco', 'Daniel Alcides Carrión', 'Oxapampa'],
    'Piura': ['Piura', 'Ayabaca', 'Huancabamba', 'Morropón', 'Paita', 'Sechura', 'Sullana', 'Talara'],
    'Puno': ['Puno', 'Azángaro', 'Carabaya', 'Chucuito', 'El Collao', 'Huancané', 'Lampa', 'Melgar', 'Moho', 'San Antonio de Putina', 'San Román', 'Sandia', 'Yunguyo'],
    'San Martín': ['Moyobamba', 'Bellavista', 'El Dorado', 'Huallaga', 'Lamas', 'Mariscal Cáceres', 'Picota', 'Rioja', 'San Martín', 'Tocache'],
    'Tacna': ['Tacna', 'Candarave', 'Jorge Basadre', 'Tarata'],
    'Tumbes': ['Tumbes', 'Contralmirante Villar', 'Zarumilla'],
    'Ucayali': ['Coronel Portillo', 'Atalaya', 'Padre Abad', 'Purús']
  };

  const distritosPorProvincia: { [key: string]: string[] } = {
    // Amazonas
    'Chachapoyas': ['Chachapoyas', 'Asunción', 'Balsas', 'Cheto', 'Chiliquín', 'Chuquibamba', 'Granada', 'Huancas', 'La Jalca', 'Leimebamba', 'Levanto', 'Magdalena', 'Mariscal Castilla', 'Molinopampa', 'Montevideo', 'Olleros', 'Quinjalca', 'San Francisco de Daguas', 'San Isidro de Maino', 'Soloco', 'Sonche'],
    'Bagua': ['Bagua', 'Aramango', 'Copallín', 'El Parco', 'Imaza', 'La Peca'],
    // Ancash
    'Huaraz': ['Huaraz', 'Cochabamba', 'Colcabamba', 'Huanchay', 'Independencia', 'Jangas', 'La Libertad', 'Olleros', 'Pampas Grande', 'Pariacoto', 'Pira', 'Tarica'],
    'Carhuaz': ['Carhuaz', 'Acopampa', 'Amashca', 'Anta', 'Ataquero', 'Marcará', 'Pariahuanca', 'San Miguel de Aco', 'Shilla', 'Tinco', 'Yungar'],
    // Apurímac
    'Abancay': ['Abancay', 'Chacoche', 'Circa', 'Curahuasi', 'Huanipaca', 'Lambrama', 'Pichirhua', 'San Pedro de Cachora', 'Tamburco'],
    'Andahuaylas': ['Andahuaylas', 'Andarapa', 'Chiara', 'Huancarama', 'Huancaray', 'Huayana', 'Kishuara', 'Pacobamba', 'Pacucha', 'Pampachiri', 'Pomacocha', 'San Antonio de Cachi', 'San Jerónimo', 'San Miguel de Chaccrampa', 'Santa María de Chicmo', 'Talavera', 'Tumay Huaraca', 'Turpo'],
    // Arequipa
    'Arequipa': ['Arequipa', 'Alto Selva Alegre', 'Cayma', 'Cerro Colorado', 'Characato', 'Chiguata', 'Jacobo Hunter', 'La Joya', 'Mariano Melgar', 'Miraflores', 'Mollebaya', 'Paucarpata', 'Pocsi', 'Polobaya', 'Quequeña', 'Sabandia', 'Sachaca', 'San Juan de Siguas', 'San Juan de Tarucani', 'Santa Isabel de Siguas', 'Santa Rita de Siguas', 'Socabaya', 'Tiabaya', 'Uchumayo', 'Vitor', 'Yanahuara', 'Yarabamba', 'Yura'],
    'Camaná': ['Camaná', 'José María Quimper', 'Mariano Nicolás Valcárcel', 'Mariscal Cáceres', 'Nicolás de Pierola', 'Ocoña', 'Quilca'],
    // Ayacucho
    'Huamanga': ['Ayacucho', 'Acocro', 'Acos Vinchos', 'Carmen Alto', 'Chiara', 'Ocros', 'Pacaycasa', 'Quinua', 'San José de Ticllas', 'San Juan Bautista', 'Santiago de Pischa', 'Socos', 'Tambillo', 'Vinchos', 'Jesús Nazareno', 'Andrés Avelino Cáceres Dorregaray'],
    // Cajamarca
    'Cajamarca': ['Cajamarca', 'Asunción', 'Chetilla', 'Cospan', 'Encañada', 'Jesús', 'Llacanora', 'Los Baños del Inca', 'Magdalena', 'Matara', 'Namora', 'San Juan', 'San Pablo', 'San Miguel', 'San Marcos', 'La Encañada'],
    'Jaén': ['Jaén', 'Bellavista', 'Chontali', 'Colasay', 'Huabal', 'Las Pirias', 'Pomahuaca', 'Pucara', 'Sallique', 'San Felipe', 'San José del Alto', 'Santa Rosa'],
    // Callao
    'Callao': ['Callao', 'Bellavista', 'Carmen de la Legua Reynoso', 'La Perla', 'La Punta', 'Ventanilla'],
    // Cusco
    'Cusco': ['Cusco', 'Ccorca', 'Poroy', 'San Jerónimo', 'San Sebastian', 'Santiago', 'Saylla', 'Wanchaq'],
    'Anta': ['Anta', 'Ancahuasi', 'Cachimayo', 'Chinchero', 'Huarocondo', 'Limatambo', 'Mollepata', 'Pucyura', 'Zurite'],
    'Calca': ['Calca', 'Coya', 'Lamay', 'Lares', 'Pisac', 'San Salvador', 'Taray', 'Yanatile'],
    // Huancavelica
    'Huancavelica': ['Huancavelica', 'Acobambilla', 'Ascensión', 'Conayca', 'Cuenca', 'Huachocolpa', 'Huayllahuara', 'Izcuchaca', 'Laria', 'Manta', 'Mariscal Cáceres', 'Moya', 'Nuevo Occoro', 'Palca', 'Pilchaca', 'Vilca', 'Yauli'],
    // Huánuco
    'Huánuco': ['Huánuco', 'Amarilis', 'Chinchao', 'Churubamba', 'Margos', 'Quisqui', 'San Francisco de Cayran', 'San Pedro de Chaulan', 'Santa María del Valle', 'Yaros', 'Yarumayo', 'Pillco Marca', 'Yacus'],
    // Ica
    'Ica': ['Ica', 'La Tinguiña', 'Los Aquijes', 'Ocucaje', 'Pachacutec', 'Parcona', 'Pueblo Nuevo', 'Salas', 'San José de los Molinos', 'San Juan Bautista', 'Santiago', 'Subtanjalla', 'Tate', 'Yauca del Rosario'],
    'Chincha': ['Chincha Alta', 'Alto Laran', 'Chavin', 'Chincha Baja', 'El Carmen', 'Grocio Prado', 'Pueblo Nuevo', 'San Juan de Yanac', 'San Pedro de Huacarpana', 'Sunampe', 'Tambo de Mora'],
    'Nazca': ['Nazca', 'Changuillo', 'El Ingenio', 'Marcona', 'Vista Alegre'],
    'Pisco': ['Pisco', 'Huancano', 'Humay', 'Independencia', 'Paracas', 'San Andrés', 'San Clemente', 'Tupac Amaru Inca'],
    // Junín
    'Huancayo': ['Huancayo', 'Carhuacallanga', 'Chacapampa', 'Chicche', 'Chilca', 'Chongos Alto', 'Chupuro', 'Colca', 'Cullhuas', 'El Tambo', 'Huacrapuquio', 'Hualhuas', 'Huancan', 'Huasicancha', 'Huayucachi', 'Ingenio', 'Pariahuanca', 'Pilcomayo', 'Pucara', 'Quichuay', 'Quilcas', 'San Agustín', 'San Jerónimo de Tunán', 'Santo Domingo de Acobamba', 'Sapallanga', 'Sicaya', 'Viques'],
    'Concepción': ['Concepción', 'Aco', 'Andamarca', 'Chambara', 'Cochas', 'Comas', 'Heroínas Toledo', 'Manzanares', 'Mariscal Castilla', 'Matahuasi', 'Mito', 'Nueve de Julio', 'Orcotuna', 'San José de Quero', 'Santa Rosa de Ocop'],
    'Tarma': ['Tarma', 'Acobamba', 'Huaricolca', 'Huasahuasi', 'La Unión', 'Palca', 'Palcamayo', 'San Pedro de Cajas', 'Tapo'],
    // La Libertad
    'Trujillo': ['Trujillo', 'El Porvenir', 'Florencia de Mora', 'Huanchaco', 'La Esperanza', 'Laredo', 'Moche', 'Poroto', 'Salaverry', 'Simbal', 'Victor Larco Herrera'],
    'Ascope': ['Ascope', 'Chicama', 'Chocope', 'Magdalena de Cao', 'Paijan', 'Rázuri', 'Santiago de Cao'],
    'Chepén': ['Chepén', 'Pacanga', 'Pueblo Nuevo'],
    // Lambayeque
    'Chiclayo': ['Chiclayo', 'Chongoyape', 'Eten', 'Eten Puerto', 'José Leonardo Ortiz', 'La Victoria', 'Lagunas', 'Monsefú', 'Nueva Arica', 'Oyotún', 'Picsi', 'Pimentel', 'Pomalca', 'Pucalá', 'Reque', 'Santa Rosa', 'Saña', 'Túcume'],
    'Ferreñafe': ['Ferreñafe', 'Cañaris', 'Incahuasi', 'Manuel Antonio Mesones Muro', 'Pitipo', 'Pueblo Nuevo'],
    'Lambayeque': ['Lambayeque', 'Chochope', 'Illimo', 'Jayanca', 'Mochumi', 'Morrope', 'Motupe', 'Olmos', 'Pacora', 'Salas', 'San José', 'Tucume'],
    // Lima
    'Lima': ['Lima', 'Ancón', 'Ate', 'Barranco', 'Breña', 'Carabayllo', 'Chaclacayo', 'Chorrillos', 'Cieneguilla', 'Comas', 'El Agustino', 'Independencia', 'Jesús María', 'La Molina', 'La Victoria', 'Lince', 'Los Olivos', 'Lurigancho', 'Lurín', 'Magdalena del Mar', 'Miraflores', 'Pachacámac', 'Pucusana', 'Pueblo Libre', 'Puente Piedra', 'Punta Hermosa', 'Punta Negra', 'Rímac', 'San Bartolo', 'San Borja', 'San Isidro', 'San Juan de Lurigancho', 'San Juan de Miraflores', 'San Luis', 'San Martín de Porres', 'San Miguel', 'Santa Anita', 'Santa María del Mar', 'Santa Rosa', 'Santiago de Surco', 'Surquillo', 'Villa El Salvador', 'Villa María del Triunfo'],
    'Cañete': ['San Vicente de Cañete', 'Asia', 'Calango', 'Cerro Azul', 'Chilca', 'Coayllo', 'Imperial', 'Lunahuana', 'Mala', 'Nuevo Imperial', 'Pacaran', 'Quilmana', 'San Antonio', 'San Luis', 'Santa Cruz de Flores', 'Zúñiga'],
    // Loreto
    'Maynas': ['Iquitos', 'Alto Nanay', 'Fernando Lores', 'Indiana', 'Las Amazonas', 'Mazán', 'Napo', 'Punchana', 'Putumayo', 'Torres Causana'],
    // Madre de Dios
    'Tambopata': ['Tambopata', 'Inambari', 'Las Piedras', 'Laberinto'],
    // Moquegua
    'Mariscal Nieto': ['Moquegua', 'Carumas', 'Cuchumbaya', 'Samegua', 'San Cristobal', 'Torata'],
    // Pasco
    'Pasco': ['Chaupimarca', 'Huachon', 'Huariaca', 'Huayllay', 'Ninacaca', 'Pallanchacra', 'Paucartambo', 'San Francisco de Asis de Yarusyacan', 'Simon Bolivar', 'Ticlacayan', 'Tinyahuarco', 'Vicco', 'Yanacancha'],
    'Oxapampa': ['Oxapampa', 'Chontabamba', 'Huancabamba', 'Palcazu', 'Pozuzo', 'Puerto Bermudez', 'Villa Rica'],
    // Piura
    'Piura': ['Piura', 'Castilla', 'Catacaos', 'Cura Mori', 'El Tallán', 'La Arena', 'La Unión', 'Las Lomas', 'Tambo Grande'],
    'Sullana': ['Sullana', 'Bellavista', 'Ignacio Escudero', 'Lancones', 'Marcavelica', 'Miguel Checa', 'Querecotillo', 'Salitral'],
    // Puno
    'Puno': ['Puno', 'Acora', 'Amantani', 'Atuncolla', 'Capachica', 'Chucuito', 'Coata', 'Huata', 'Mañazo', 'Paucarcolla', 'Pichacani', 'Plateria', 'San Antonio', 'Tiquillaca', 'Vilque'],
    'Juliaca': ['Juliaca', 'Cabanillas', 'Cabana', 'Caracoto', 'San Miguel', 'Santiago'],
    // San Martín
    'Moyobamba': ['Moyobamba', 'Calzada', 'Habana', 'Jepelacio', 'Soritor', 'Yantalo'],
    'Tarapoto': ['Tarapoto', 'Alberto Leveau', 'Cacatachi', 'Chazuta', 'Chipurana', 'El Porvenir', 'Huimbayoc', 'Juan Guerra', 'La Banda de Shilcayo', 'Morales', 'Papaplaya', 'San Antonio', 'Sauce', 'Shapaja'],
    // Tacna
    'Tacna': ['Tacna', 'Alto de la Alianza', 'Calana', 'Ciudad Nueva', 'Inclan', 'Pachia', 'Palca', 'Pocollay', 'Sama', 'Coronel Gregorio Albarracin Lanchipa'],
    // Tumbes
    'Tumbes': ['Tumbes', 'Corrales', 'La Cruz', 'Pampas de Hospital', 'San Jacinto', 'San Juan de la Virgen'],
    // Ucayali
    'Coronel Portillo': ['Calleria', 'Campoverde', 'Iparia', 'Masisea', 'Yarinacocha', 'Nueva Requena'],
    'Padre Abad': ['Aguaytia', 'Irazola', 'Raymondi']
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden">
        <BrandingPanel isMobile={true} activeTab="registro" />
      </div>

      {/* Mobile Form Container */}
      <div className="lg:hidden bg-white rounded-t-3xl -mt-6 relative z-10 flex-1 px-6 py-8 overflow-y-auto">
        {/* Mobile Tabs */}
        <div className="flex mb-6">
          <div className="flex-1 flex flex-col items-center">
            <Link
              href="/login"
              className="w-full text-center py-3 font-semibold"
              style={{ color: '#666C68' }}
            >
              Inicio
            </Link>
            <div className="w-full h-1" style={{ backgroundColor: '#666C68' }}></div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <Link
              href="/registro"
              className="w-full text-center py-3 font-semibold"
              style={{ color: '#9F00AD' }}
            >
              Registro
            </Link>
            <div className="w-full h-1" style={{ backgroundColor: '#FFD900' }}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Documento de identidad */}
          <div className="relative">
            <input
              type="text"
              name="documento"
              placeholder="Documento de identidad"
              value={formData.documento}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12"
              style={{ borderColor: '#9F00AD' }}
              onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
              onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
              required
            />
            <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" width="20" height="12" viewBox="0 0 27 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.6776 2.66922C15.6776 2.43352 15.7694 2.20747 15.9327 2.0408C16.096 1.87413 16.3176 1.7805 16.5486 1.7805H26.129C26.36 1.7805 26.5816 1.87413 26.7449 2.0408C26.9082 2.20747 27 2.43352 27 2.66922C27 2.90492 26.9082 3.13097 26.7449 3.29764C26.5816 3.4643 26.36 3.55794 26.129 3.55794H16.5486C16.3176 3.55794 16.096 3.4643 15.9327 3.29764C15.7694 3.13097 15.6776 2.90492 15.6776 2.66922ZM26.129 7.11281H16.5486C16.3176 7.11281 16.096 7.20644 15.9327 7.37311C15.7694 7.53978 15.6776 7.76583 15.6776 8.00153C15.6776 8.23723 15.7694 8.46328 15.9327 8.62995C16.096 8.79662 16.3176 8.89025 16.5486 8.89025H26.129C26.36 8.89025 26.5816 8.79662 26.7449 8.62995C26.9082 8.46328 27 8.23723 27 8.00153C27 7.76583 26.9082 7.53978 26.7449 7.37311C26.5816 7.20644 26.36 7.11281 26.129 7.11281ZM26.129 12.4451H19.1614C18.9304 12.4451 18.7089 12.5388 18.5456 12.7054C18.3822 12.8721 18.2905 13.0981 18.2905 13.3338C18.2905 13.5695 18.3822 13.7956 18.5456 13.9623C18.7089 14.1289 18.9304 14.2226 19.1614 14.2226H26.129C26.36 14.2226 26.5816 14.1289 26.7449 13.9623C26.9082 13.7956 27 13.5695 27 13.3338C27 13.0981 26.9082 12.8721 26.7449 12.7054C26.5816 12.5388 26.36 12.4451 26.129 12.4451ZM11.0278 9.55679C11.8922 8.87743 12.5265 7.93904 12.8418 6.87321C13.1571 5.80739 13.1375 4.6676 12.7859 3.61369C12.4342 2.55978 11.7681 1.64461 10.8809 0.996543C9.99379 0.348472 8.93009 0 7.83902 0C6.74796 0 5.68425 0.348472 4.79709 0.996543C3.90993 1.64461 3.24382 2.55978 2.89216 3.61369C2.54051 4.6676 2.52096 5.80739 2.83625 6.87321C3.15154 7.93904 3.78586 8.87743 4.65024 9.55679C2.40536 10.5266 0.636235 12.4785 0.0276564 14.8891C-0.0055836 15.0205 -0.00890752 15.1579 0.0179394 15.2907C0.0447863 15.4236 0.101091 15.5484 0.182539 15.6557C0.263986 15.7629 0.368414 15.8497 0.487818 15.9094C0.607222 15.9691 0.738433 16.0001 0.871393 16H14.8067C14.9396 16.0001 15.0708 15.9691 15.1902 15.9094C15.3096 15.8497 15.4141 15.7629 15.4955 15.6557C15.577 15.5484 15.6333 15.4236 15.6601 15.2907C15.6869 15.1579 15.6836 15.0205 15.6504 14.8891C15.0418 12.4773 13.2727 10.5255 11.0278 9.55679Z" fill="#9F00AD" fillOpacity="0.5"/>
            </svg>
          </div>

          {/* Menor de edad / extranjero */}
          <label className="flex items-center">
            <input
              type="checkbox"
              name="menorEdad"
              checked={formData.menorEdad}
              onChange={handleChange}
              className="mr-2 checkbox-custom"
            />
            <span className="text-gray-700">Menor de edad / extranjero</span>
          </label>

          {/* Nombre y Apellido en la misma fila */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12"
                style={{ borderColor: '#9F00AD' }}
                onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
                onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
                required
              />
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" width="16" height="18" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0C12.7625 0 15 2.2375 15 5C15 7.7625 12.7625 10 10 10C7.2375 10 5 7.7625 5 5C5 2.2375 7.2375 0 10 0ZM15 13.175C15 14.5 14.65 17.5875 12.2625 21.0375L11.25 15L12.425 12.65C11.65 12.5625 10.8375 12.5 10 12.5C9.1625 12.5 8.35 12.5625 7.575 12.65L8.75 15L7.7375 21.0375C5.35 17.5875 5 14.5 5 13.175C2.0125 14.05 0 15.625 0 17.5V22.5H20V17.5C20 15.625 18 14.05 15 13.175Z" fill="#9F00AD" fillOpacity="0.5"/>
              </svg>
            </div>
            <div className="relative">
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={formData.apellido}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12"
                style={{ borderColor: '#9F00AD' }}
                onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
                onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
                required
              />
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" width="16" height="18" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0C12.7625 0 15 2.2375 15 5C15 7.7625 12.7625 10 10 10C7.2375 10 5 7.7625 5 5C5 2.2375 7.2375 0 10 0ZM15 13.175C15 14.5 14.65 17.5875 12.2625 21.0375L11.25 15L12.425 12.65C11.65 12.5625 10.8375 12.5 10 12.5C9.1625 12.5 8.35 12.5625 7.575 12.65L8.75 15L7.7375 21.0375C5.35 17.5875 5 14.5 5 13.175C2.0125 14.05 0 15.625 0 17.5V22.5H20V17.5C20 15.625 18 14.05 15 13.175Z" fill="#9F00AD" fillOpacity="0.5"/>
              </svg>
            </div>
          </div>

          {/* Celular */}
          <div className="relative">
            <input
              type="tel"
              name="celular"
              placeholder="Celular"
              value={formData.celular}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12"
              style={{ borderColor: '#9F00AD' }}
              onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
              onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
              required
            />
            <FaPhone className="absolute right-4 top-1/2 transform -translate-y-1/2" style={{ color: '#9F00AD80' }} />
          </div>

          {/* Correo */}
          <div className="relative">
            <input
              type="email"
              name="correo"
              placeholder="Correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12"
              style={{ borderColor: '#9F00AD' }}
              onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
              onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
              required
            />
            <FaEnvelope className="absolute right-4 top-1/2 transform -translate-y-1/2" style={{ color: '#9F00AD80' }} />
          </div>

          {/* Fecha de Nacimiento */}
          <div className="relative">
            <input
              id="fechaNacimientoMobile"
              type="date"
              name="fechaNacimiento"
              placeholder="Fecha de Nacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12 date-input-custom"
              style={{ borderColor: '#9F00AD' }}
              onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
              onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
              required
            />
            <svg 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                const input = document.getElementById('fechaNacimientoMobile') as HTMLInputElement;
                if (input) input.showPicker();
              }}
            >
              <path d="M16.625 15.8334V4.75004C16.625 3.87683 15.9149 3.16671 15.0417 3.16671H13.4583V1.58337H11.875V3.16671H7.125V1.58337H5.54167V3.16671H3.95833C3.08512 3.16671 2.375 3.87683 2.375 4.75004V15.8334C2.375 16.7066 3.08512 17.4167 3.95833 17.4167H15.0417C15.9149 17.4167 16.625 16.7066 16.625 15.8334ZM7.125 14.25H5.54167V12.6667H7.125V14.25ZM7.125 11.0834H5.54167V9.50004H7.125V11.0834ZM10.2917 14.25H8.70833V12.6667H10.2917V14.25ZM10.2917 11.0834H8.70833V9.50004H10.2917V11.0834ZM13.4583 14.25H11.875V12.6667H13.4583V14.25ZM13.4583 11.0834H11.875V9.50004H13.4583V11.0834ZM15.0417 7.12504H3.95833V5.54171H15.0417V7.12504Z" fill="#9F00AD" fillOpacity="0.5"/>
            </svg>
          </div>

            {/* Departamento, Provincia y Distrito */}
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <select
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none text-gray-700 appearance-none bg-white"
                  style={{ borderColor: '#9F00AD' }}
                  onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
                  onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
                  required
                >
                  <option value="">Depto.</option>
                  {departamentos.map((depto) => (
                    <option key={depto} value={depto}>
                      {depto}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" size={16} style={{ color: '#9F00AD80' }} />
              </div>
              <div className="relative">
                <select
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none bg-white"
                  style={{ borderColor: '#9F00AD' }}
                  onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
                  onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
                  required
                  disabled={!formData.departamento}
                >
                  <option value="">Provincia</option>
                  {formData.departamento && provinciasPorDepartamento[formData.departamento]?.map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" size={16} style={{ color: '#9F00AD80' }} />
              </div>
              <div className="relative">
                <select
                  name="distrito"
                  value={formData.distrito}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-purple text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none bg-white"
                  required
                  disabled={!formData.provincia}
                >
                  <option value="">Distrito</option>
                  {formData.provincia && distritosPorProvincia[formData.provincia]?.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" size={16} style={{ color: '#9F00AD80' }} />
              </div>
            </div>

          {/* Contraseña */}
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="contraseña"
              placeholder="Contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12"
              style={{ borderColor: '#9F00AD' }}
              onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
              onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors"
              style={{ color: '#9F00AD80' }}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>

          {/* Código de patrocinador */}
          <div className="relative">
            <input
              type="text"
              name="codigoPatrocinador"
              placeholder="Código de patrocinador"
              value={formData.codigoPatrocinador}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12"
              style={{ borderColor: '#9F00AD' }}
              onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
              onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
            />
            <FaPaperPlane className="absolute right-4 top-1/2 transform -translate-y-1/2" style={{ color: '#9F00AD80' }} />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary-purple text-white py-3 font-semibold text-lg hover:bg-primary-magenta transition-colors"
            style={{ borderRadius: '30px' }}
          >
            Registrarme
          </button>

          {/* Términos de uso */}
          <label className="flex items-center justify-center">
            <input
              type="checkbox"
              name="terminos"
              checked={formData.terminos}
              onChange={handleChange}
              className="mr-2 checkbox-custom"
              required
            />
            <span className="text-sm">
              <span style={{ color: '#9F00AD' }}>Acepto los</span>{' '}
              <span style={{ color: '#89888D' }}>términos de uso</span>
            </span>
          </label>
        </form>

        {/* Social Icons */}
        <div className="mt-8">
          <SocialIcons />
        </div>

        {/* Login Link */}
        <div className="mt-6 text-center text-sm">
          <span style={{ color: '#89888D' }}>¿Ya tienes cuenta? </span>
          <Link
            href="/login"
            className="text-sm"
            style={{ color: '#9F00AD' }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#D209B6'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#9F00AD'}
          >
            Haz clic aquí
          </Link>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-semibold mb-8 text-center" style={{ color: '#3B3B3B', fontFamily: 'Inter, sans-serif', fontWeight: 600 }}>REGÍSTRATE</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Documento de identidad */}
            <div className="relative">
              <input
                type="text"
                name="documento"
                placeholder="Documento de identidad"
                value={formData.documento}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12"
                style={{ borderColor: '#9F00AD', fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
                onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
                onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
                required
              />
              <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" width="20" height="12" viewBox="0 0 27 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.6776 2.66922C15.6776 2.43352 15.7694 2.20747 15.9327 2.0408C16.096 1.87413 16.3176 1.7805 16.5486 1.7805H26.129C26.36 1.7805 26.5816 1.87413 26.7449 2.0408C26.9082 2.20747 27 2.43352 27 2.66922C27 2.90492 26.9082 3.13097 26.7449 3.29764C26.5816 3.4643 26.36 3.55794 26.129 3.55794H16.5486C16.3176 3.55794 16.096 3.4643 15.9327 3.29764C15.7694 3.13097 15.6776 2.90492 15.6776 2.66922ZM26.129 7.11281H16.5486C16.3176 7.11281 16.096 7.20644 15.9327 7.37311C15.7694 7.53978 15.6776 7.76583 15.6776 8.00153C15.6776 8.23723 15.7694 8.46328 15.9327 8.62995C16.096 8.79662 16.3176 8.89025 16.5486 8.89025H26.129C26.36 8.89025 26.5816 8.79662 26.7449 8.62995C26.9082 8.46328 27 8.23723 27 8.00153C27 7.76583 26.9082 7.53978 26.7449 7.37311C26.5816 7.20644 26.36 7.11281 26.129 7.11281ZM26.129 12.4451H19.1614C18.9304 12.4451 18.7089 12.5388 18.5456 12.7054C18.3822 12.8721 18.2905 13.0981 18.2905 13.3338C18.2905 13.5695 18.3822 13.7956 18.5456 13.9623C18.7089 14.1289 18.9304 14.2226 19.1614 14.2226H26.129C26.36 14.2226 26.5816 14.1289 26.7449 13.9623C26.9082 13.7956 27 13.5695 27 13.3338C27 13.0981 26.9082 12.8721 26.7449 12.7054C26.5816 12.5388 26.36 12.4451 26.129 12.4451ZM11.0278 9.55679C11.8922 8.87743 12.5265 7.93904 12.8418 6.87321C13.1571 5.80739 13.1375 4.6676 12.7859 3.61369C12.4342 2.55978 11.7681 1.64461 10.8809 0.996543C9.99379 0.348472 8.93009 0 7.83902 0C6.74796 0 5.68425 0.348472 4.79709 0.996543C3.90993 1.64461 3.24382 2.55978 2.89216 3.61369C2.54051 4.6676 2.52096 5.80739 2.83625 6.87321C3.15154 7.93904 3.78586 8.87743 4.65024 9.55679C2.40536 10.5266 0.636235 12.4785 0.0276564 14.8891C-0.0055836 15.0205 -0.00890752 15.1579 0.0179394 15.2907C0.0447863 15.4236 0.101091 15.5484 0.182539 15.6557C0.263986 15.7629 0.368414 15.8497 0.487818 15.9094C0.607222 15.9691 0.738433 16.0001 0.871393 16H14.8067C14.9396 16.0001 15.0708 15.9691 15.1902 15.9094C15.3096 15.8497 15.4141 15.7629 15.4955 15.6557C15.577 15.5484 15.6333 15.4236 15.6601 15.2907C15.6869 15.1579 15.6836 15.0205 15.6504 14.8891C15.0418 12.4773 13.2727 10.5255 11.0278 9.55679Z" fill="#9F00AD" fillOpacity="0.5"/>
              </svg>
            </div>

            {/* Menor de edad / extranjero */}
            <label className="flex items-center">
              <input
                type="checkbox"
                name="menorEdad"
                checked={formData.menorEdad}
                onChange={handleChange}
                className="mr-2 checkbox-custom"
              />
              <span className="text-gray-700">Menor de edad / extranjero</span>
            </label>

            {/* Nombre y Apellido en la misma fila */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12"
                  style={{ borderColor: '#9F00AD', fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
                  onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
                  onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
                  required
                />
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" width="16" height="18" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0C12.7625 0 15 2.2375 15 5C15 7.7625 12.7625 10 10 10C7.2375 10 5 7.7625 5 5C5 2.2375 7.2375 0 10 0ZM15 13.175C15 14.5 14.65 17.5875 12.2625 21.0375L11.25 15L12.425 12.65C11.65 12.5625 10.8375 12.5 10 12.5C9.1625 12.5 8.35 12.5625 7.575 12.65L8.75 15L7.7375 21.0375C5.35 17.5875 5 14.5 5 13.175C2.0125 14.05 0 15.625 0 17.5V22.5H20V17.5C20 15.625 18 14.05 15 13.175Z" fill="#9F00AD" fillOpacity="0.5"/>
                </svg>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="apellido"
                  placeholder="Apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12"
                  style={{ borderColor: '#9F00AD', fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
                  onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
                  onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
                  required
                />
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" width="16" height="18" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0C12.7625 0 15 2.2375 15 5C15 7.7625 12.7625 10 10 10C7.2375 10 5 7.7625 5 5C5 2.2375 7.2375 0 10 0ZM15 13.175C15 14.5 14.65 17.5875 12.2625 21.0375L11.25 15L12.425 12.65C11.65 12.5625 10.8375 12.5 10 12.5C9.1625 12.5 8.35 12.5625 7.575 12.65L8.75 15L7.7375 21.0375C5.35 17.5875 5 14.5 5 13.175C2.0125 14.05 0 15.625 0 17.5V22.5H20V17.5C20 15.625 18 14.05 15 13.175Z" fill="#9F00AD" fillOpacity="0.5"/>
                </svg>
              </div>
            </div>

            {/* Celular */}
            <div className="relative">
              <input
                type="tel"
                name="celular"
                placeholder="Celular"
                value={formData.celular}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12"
                style={{ borderColor: '#9F00AD', fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
                onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
                onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
                required
              />
              <FaPhone className="absolute right-4 top-1/2 transform -translate-y-1/2" style={{ color: '#9F00AD80' }} />
            </div>

            {/* Correo */}
            <div className="relative">
              <input
                type="email"
                name="correo"
                placeholder="Correo"
                value={formData.correo}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12"
                style={{ borderColor: '#9F00AD', fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
                onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
                onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
                required
              />
              <FaEnvelope className="absolute right-4 top-1/2 transform -translate-y-1/2" style={{ color: '#9F00AD80' }} />
            </div>

            {/* Fecha de Nacimiento */}
            <div className="relative">
              <input
                id="fechaNacimientoDesktop"
                type="date"
                name="fechaNacimiento"
                placeholder="Fecha de Nacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12 date-input-custom"
                style={{ borderColor: '#9F00AD', fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
                onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
                onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
                required
              />
              <svg 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  const input = document.getElementById('fechaNacimientoDesktop') as HTMLInputElement;
                  if (input) input.showPicker();
                }}
              >
                <path d="M16.625 15.8334V4.75004C16.625 3.87683 15.9149 3.16671 15.0417 3.16671H13.4583V1.58337H11.875V3.16671H7.125V1.58337H5.54167V3.16671H3.95833C3.08512 3.16671 2.375 3.87683 2.375 4.75004V15.8334C2.375 16.7066 3.08512 17.4167 3.95833 17.4167H15.0417C15.9149 17.4167 16.625 16.7066 16.625 15.8334ZM7.125 14.25H5.54167V12.6667H7.125V14.25ZM7.125 11.0834H5.54167V9.50004H7.125V11.0834ZM10.2917 14.25H8.70833V12.6667H10.2917V14.25ZM10.2917 11.0834H8.70833V9.50004H10.2917V11.0834ZM13.4583 14.25H11.875V12.6667H13.4583V14.25ZM13.4583 11.0834H11.875V9.50004H13.4583V11.0834ZM15.0417 7.12504H3.95833V5.54171H15.0417V7.12504Z" fill="#9F00AD" fillOpacity="0.5"/>
              </svg>
            </div>

            {/* Departamento, Provincia y Distrito */}
            <div className="grid grid-cols-3 gap-4">
              <div className="relative">
                <select
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none text-gray-700 appearance-none bg-white"
                  style={{ borderColor: '#9F00AD' }}
                  onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
                  onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
                  required
                >
                  <option value="">Depto.</option>
                  {departamentos.map((depto) => (
                    <option key={depto} value={depto}>
                      {depto}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" size={16} style={{ color: '#9F00AD80' }} />
              </div>
              <div className="relative">
                <select
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none bg-white"
                  style={{ borderColor: '#9F00AD' }}
                  onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
                  onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
                  required
                  disabled={!formData.departamento}
                >
                  <option value="">Provincia</option>
                  {formData.departamento && provinciasPorDepartamento[formData.departamento]?.map((prov) => (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" size={16} style={{ color: '#9F00AD80' }} />
              </div>
              <div className="relative">
                <select
                  name="distrito"
                  value={formData.distrito}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none text-gray-700 disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none bg-white"
                  style={{ borderColor: '#9F00AD' }}
                  onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
                  onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
                  required
                  disabled={!formData.provincia}
                >
                  <option value="">Distrito</option>
                  {formData.provincia && distritosPorProvincia[formData.provincia]?.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
                <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" size={16} style={{ color: '#9F00AD80' }} />
              </div>
            </div>

            {/* Contraseña */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="contraseña"
                placeholder="Contraseña"
                value={formData.contraseña}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12"
                style={{ borderColor: '#9F00AD', fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
                onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
                onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors"
                style={{ color: '#9F00AD80' }}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            {/* Código de patrocinador */}
            <div className="relative">
              <input
                type="text"
                name="codigoPatrocinador"
                placeholder="Código de patrocinador"
                value={formData.codigoPatrocinador}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none text-gray-700 pr-12"
                style={{ borderColor: '#9F00AD', fontFamily: 'Roboto, sans-serif', fontWeight: 400 }}
                onFocus={(e) => e.target.style.borderColor = '#9F00AD'}
                onBlur={(e) => e.target.style.borderColor = '#9F00AD'}
              />
              <FaPaperPlane className="absolute right-4 top-1/2 transform -translate-y-1/2" style={{ color: '#9F00AD80' }} />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary-purple text-white py-3 font-semibold text-lg hover:bg-primary-magenta transition-colors"
              style={{ borderRadius: '30px' }}
            >
              Registrarme
            </button>

            {/* Términos de uso */}
            <label className="flex items-center justify-center">
              <input
                type="checkbox"
                name="terminos"
                checked={formData.terminos}
                onChange={handleChange}
                className="mr-2 checkbox-custom"
                required
              />
              <span className="text-sm">
                <span style={{ color: '#9F00AD' }}>Acepto los</span>{' '}
                <span style={{ color: '#89888D' }}>términos de uso</span>
              </span>
            </label>
          </form>

          {/* Social Icons */}
          <div className="mt-8">
            <SocialIcons />
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm">
            <span style={{ color: '#89888D' }}>¿Ya tienes cuenta? </span>
            <Link
              href="/login"
              className="text-sm"
              style={{ color: '#9F00AD' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#D209B6'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#9F00AD'}
            >
              Haz clic aquí
            </Link>
          </div>
        </div>
      </div>

      {/* Right Panel - Branding */}
      <div className="hidden lg:block lg:w-1/2">
        <BrandingPanel activeTab="registro" onTabChange={(tab) => {
          if (tab === 'inicio') router.push('/login');
        }} />
      </div>
    </div>
  );
}

