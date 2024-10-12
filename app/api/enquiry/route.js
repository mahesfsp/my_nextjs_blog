import connectMongo from "../../../utils/connectMongo";
import { NextResponse } from "next/server";
import EnquiryModel from "@/models/enquiryModel";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();
    
    // Validation checks
    if (!name || !email || !message) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    const enquiry = { name, email, message };
    await connectMongo();
    await EnquiryModel.create(enquiry);
    return NextResponse.json({ message: "Enquiry has been sent." });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
