import express from 'express';
import { Aggregation, bulkWrite, countMovies, createMovies, deleteMovieByName, deleteOneMovie, getAllMovies, getOneMovie, updateMovie } from '../Controllers/movieController.js';

const router = express.Router();



router.post('/movies/insert',createMovies);
router.get('/movies',getAllMovies);
router.get('/movies/:id',getOneMovie);
router.patch('/movies/:id',updateMovie);
router.delete('/movies/:id',deleteOneMovie);
router.delete('/movies',deleteMovieByName);
router.post('/movies/operations', bulkWrite);
router.get('/count', countMovies);
router.get('/movies/aggregation', Aggregation);


export default router;