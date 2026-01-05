'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BrandingPanel from '../components/BrandingPanel';
import SocialIcons from '../components/SocialIcons';
import { FaEye, FaEyeSlash, FaUser, FaPhone, FaEnvelope, FaCalendar, FaPaperPlane, FaChevronDown } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';

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
        <div className="flex mb-6 bg-primary-purple rounded-t-lg">
          <Link
            href="/login"
            className="flex-1 text-center py-3 text-white font-semibold"
          >
            Inicio
          </Link>
          <Link
            href="/registro"
            className="flex-1 text-center py-3 text-primary-purple bg-white font-semibold border-b-2 border-primary-purple rounded-tr-lg"
          >
            Registro
          </Link>
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
            <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2" style={{ color: '#9F00AD80' }} />
          </div>

          {/* Menor de edad / extranjero */}
          <label className="flex items-center">
            <input
              type="checkbox"
              name="menorEdad"
              checked={formData.menorEdad}
              onChange={handleChange}
              className="mr-2 w-5 h-5 text-primary-purple focus:ring-primary-purple"
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
              <FaStar className="absolute right-4 top-1/2 transform -translate-y-1/2" style={{ color: '#9F00AD80' }} />
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
              <FaStar className="absolute right-4 top-1/2 transform -translate-y-1/2" style={{ color: '#9F00AD80' }} />
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
            className="w-full bg-primary-purple text-white py-3 rounded-lg font-semibold text-lg hover:bg-primary-magenta transition-colors"
          >
            Registrarme
          </button>

          {/* Términos de uso */}
          <label className="flex items-center">
            <input
              type="checkbox"
              name="terminos"
              checked={formData.terminos}
              onChange={handleChange}
              className="mr-2 w-5 h-5 text-primary-purple focus:ring-primary-purple"
              required
            />
            <span className="text-gray-700 text-sm">
              Acepto los términos de uso
            </span>
          </label>
        </form>

        {/* Social Icons */}
        <div className="mt-8">
          <SocialIcons />
        </div>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-primary-purple hover:text-primary-magenta text-sm"
          >
            ¿Ya tienes cuenta? Inicia sesión
          </Link>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-primary-purple mb-8 text-center">REGÍSTRATE</h1>
          
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
              <FaUser className="absolute right-4 top-1/2 transform -translate-y-1/2" style={{ color: '#9F00AD80' }} />
            </div>

            {/* Menor de edad / extranjero */}
            <label className="flex items-center">
              <input
                type="checkbox"
                name="menorEdad"
                checked={formData.menorEdad}
                onChange={handleChange}
                className="mr-2 w-5 h-5 text-primary-purple focus:ring-primary-purple"
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
                <FaStar className="absolute right-4 top-1/2 transform -translate-y-1/2" style={{ color: '#9F00AD80' }} />
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
                <FaStar className="absolute right-4 top-1/2 transform -translate-y-1/2" style={{ color: '#9F00AD80' }} />
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
              className="w-full bg-primary-purple text-white py-3 rounded-lg font-semibold text-lg hover:bg-primary-magenta transition-colors"
            >
              Registrarme
            </button>

            {/* Términos de uso */}
            <label className="flex items-center">
              <input
                type="checkbox"
                name="terminos"
                checked={formData.terminos}
                onChange={handleChange}
                className="mr-2 w-5 h-5 text-primary-purple focus:ring-primary-purple"
                required
              />
              <span className="text-gray-700 text-sm">
                Acepto los términos de uso
              </span>
            </label>
          </form>

          {/* Social Icons */}
          <div className="mt-8">
            <SocialIcons />
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-primary-purple hover:text-primary-magenta text-sm"
            >
              ¿Ya tienes cuenta? Inicia sesión
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

