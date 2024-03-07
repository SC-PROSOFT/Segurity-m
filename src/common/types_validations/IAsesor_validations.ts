// Función de validación para el rango de ID
const validateAsesorId = (id: number): boolean => {
  return id >= 1000 && id <= 9999;
};

export {validateAsesorId};
