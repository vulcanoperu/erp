// Validaciones específicas para Perú

export const validateDNI = (dni: string): boolean => {
  if (!/^\d{8}$/.test(dni)) return false;
  
  // Algoritmo de validación DNI Perú
  const digits = dni.split('').map(Number);
  const checkDigit = digits[7];
  
  const weights = [3, 2, 7, 6, 5, 4, 3, 2];
  const sum = digits.slice(0, 7).reduce((acc, digit, index) => acc + digit * weights[index], 0);
  const remainder = sum % 11;
  const calculatedCheckDigit = remainder < 2 ? remainder : 11 - remainder;
  
  return checkDigit === calculatedCheckDigit;
};

export const validateRUC = (ruc: string): boolean => {
  if (!/^\d{11}$/.test(ruc)) return false;
  
  // Validación básica RUC Perú
  const firstTwoDigits = ruc.substring(0, 2);
  const validPrefixes = ['10', '15', '17', '20'];
  
  if (!validPrefixes.includes(firstTwoDigits)) return false;
  
  // Algoritmo de validación para RUC tipo 20 (empresas)
  if (firstTwoDigits === '20') {
    const digits = ruc.split('').map(Number);
    const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    const sum = digits.slice(0, 10).reduce((acc, digit, index) => acc + digit * weights[index], 0);
    const remainder = sum % 11;
    const checkDigit = remainder < 2 ? remainder : 11 - remainder;
    return digits[10] === checkDigit;
  }
  
  return true; // Validación básica para otros tipos
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2
  }).format(amount);
};

export const formatDocument = (type: 'DNI' | 'RUC', document: string): string => {
  if (type === 'DNI') {
    return document.replace(/(\d{2})(\d{3})(\d{3})/, '$1.$2.$3');
  }
  if (type === 'RUC') {
    return document.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1.$2.$3.$4');
  }
  return document;
};

// Departamentos del Perú para Ubigeo
export const departments = [
  'Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca',
  'Callao', 'Cusco', 'Huancavelica', 'Huánuco', 'Ica', 'Junín', 'La Libertad',
  'Lambayeque', 'Lima', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco',
  'Piura', 'Puno', 'San Martín', 'Tacna', 'Tumbes', 'Ucayali'
];

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Formatos válidos para Perú: 9xxxxxxxx, +51xxxxxxxxx, etc.
  const phoneRegex = /^(\+51|51)?[9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
};