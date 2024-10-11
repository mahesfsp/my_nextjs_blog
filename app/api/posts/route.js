import connectMongo from "../../../utils/connectMongo";
import PostModel from "../../../models/postModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  const query = req.nextUrl.searchParams.get("q");
  try {
    await connectMongo();
    let postData;
    if (query) {
       postData = await PostModel.find({
        $or:[
          {title:new RegExp(query,'i')},
          {description:new RegExp(query,'i')},
        ]
      });
    } else {
       postData = await PostModel.find({});
    }
    return NextResponse.json(postData); 
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
