const unknownPoint = (req, res, next) => {
    res.status(404).send({ error: 'Unknown endpoint' });
    next();
}
export default unknownPoint;