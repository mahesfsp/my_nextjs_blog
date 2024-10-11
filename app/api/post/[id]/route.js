import connectMongo from "../../../../utils/connectMongo";
import PostModel from "../../../../models/postModel";
import { NextResponse } from "next/server";

export async function GET(req,{ params }) {
  try {
    await connectMongo();
    const id = params.id;
    const postData = await PostModel.findOne({ _id: id });
    return NextResponse.json(postData); 
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
