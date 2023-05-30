import Favorite from "../models/Favorite.js";

//UPDATE
export const updateFav = async (req, res, next) => {
  const fav = await Favorite.findOne({ userId: req.user.id });
  if (!fav) {
    const newFavorite = new Favorite(req.body);
    try {
      const savedFavorite = await newFavorite.save();
      res.status(200).json(savedFavorite);
    } catch (err) {
      next(err);
    }
  } else {
    try {
      const newfav = { ...fav._doc };
      let newarr = [];
      let notbeenadd = true;
      for (let item of newfav.products) {
        if (item.productId !== req.body.products[0].productId)
          newarr.push(item);
        else {
          notbeenadd = false;
          if (req.body.products[0].productTitle)
            newarr.push(req.body.products[0]);
        }
      }
      if (notbeenadd) newarr = [...newarr, req.body.products[0]];
      newfav.products = newarr;
      const updatedFav = await Favorite.findByIdAndUpdate(
        fav._id,
        { $set: newfav },
        { new: true }
      );
      res.status(200).json(updatedFav);
    } catch (err) {
      next(err);
    }
  }
};

export const deleteFav = async (req, res, next) => {
  try {
    await Favorite.findByIdAndDelete(req.params.id);
    res.status(200).json("Favorite has been deleted...");
  } catch (err) {
    next(err);
  }
};

export const getFav = async (req, res, next) => {
  try {
    const fav = await Favorite.findOne({ userId: req.user.id });
    res.status(200).json(fav);
  } catch (err) {
    next(err);
  }
};

export const getFavs = async (req, res, next) => {
  try {
    const favs = await Favorite.find();
    res.status(200).json(favs);
  } catch (err) {
    next(err);
  }
};
