const requireAxios = async (req) => {
  if (req === "axios-request") {
    return true;
  } else {
    return false;
  }
};

module.exports = requireAxios;
