//Add Many movies
export const createMovies= async (req, res) => {
    try {
        const movie = req.body.movies;
        const result = await req.db.collection('movies').insertMany(movie);
        res.json(result);    
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }
}

//Get all movies
export const getAllMovies= async (req, res) => {
    try {
        const movie = await req.db.collection('movies').find().toArray();
        if (movie) {
            res.json(movie);
        }
        else {
            res.status(404).json({ message: 'No movies found' });   
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }}


//Find one movie by ID
 export const getOneMovie = async (req, res) => {
        try { 
            const id = req.params.id;
            const movie = await req.db.collection('movies').findOne({ _id: new req.db.ObjectId(id)});
            if (movie) {
                res.json(movie);
            }
            else {
                res.status(404).json({ message: 'Movie not found' });   
            }} catch (error) {
                res.status(500).json({ error: error.message }); 
            }
        }

//update movie by ID
export const updateMovie = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;
        const updatedMovie = await req.db.collection('movies').findOneAndUpdate(
            { _id: new req.db.ObjectId(id) },
            {$set: updates},
            { returnDocument: 'after' }
        );
        if (updatedMovie) {
            res.json(updatedMovie);
        }
        else {
            res.status(404).json({ message: 'Movie not found' });   
        }
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }}



//delete movie by ID
export const deleteOneMovie = async(req,res)=>{
    try {
        const id = req.params.id;
    const result = await req.db.collection('movies').deleteOne({_id: new req.db.ObjectId(id)})
        if(result){
            res.json({message: 'Movie deleted Successfully'});
        }
        else{
            res.status(404).json({message: 'Unable to delete'})
        }
        
    } catch (error) {
        res.status(500).json({error})
        
    }
}

// Delete movies by name

export const deleteMovieByName = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Movie name is required' });
    }

    const result = await req.db.collection('movies').deleteMany({ title: name });

    if (result.deletedCount > 0) {
      return res.json({ message: `${result.deletedCount} movie(s) deleted successfully` });
    } else {
      return res.status(404).json({ message: 'No movies found with that name' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


// Bulk-Write

export const bulkWrite = async(req, res) => {
    try {
    const Operations = req.body.Operations;
    const result = await req.db.collection("movies").bulkWrite(Operations);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message});
    
}
}



//count movies 
export const countMovies = async (req, res) => {
  try {
    const count = await req.db.collection('movies').countDocuments();
    return res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


//Aggregation
export const Aggregation = async (req, res) => {
  try {
    const aggregation = await req.db.collection('movies').aggregate([
        { $match : { genre:{ $in: ["Action","Adventure"] } } },
        { $group: { _id: '$genre', avgRating: {$avg: '$imdb.rating'}}},
        { $sort: { avgRating: -1 } }
    ]).toArray();
    return res.status(200).json(aggregation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }}