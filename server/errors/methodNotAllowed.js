const methodNotAllowed = (req, res) => {
  return res.status(405).send({
    message: `Method Not Allowed. Take a look your method. Hint: it should NOT be ${req.method}.`,
  });
};

module.exports = methodNotAllowed;
