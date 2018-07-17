import {Category} from "./category.model";
/**
 * Created by mohammed on 7/4/2018.
 */
export interface VideoPaginated {
  count: Number,
  next: any,
  previous: any,
  results: Video[]
}

export interface Video {
  id: Number
  _id:Number,
  creator:any,
  title: string,
  likes: Number,
  image: string,
  description: string,
  thumbnail: string,
  thumbnails: Object,
  counter:{
    likes : number,
    views : number
  },
  date: Date,
  category: Category,
  is_liked:boolean
}
