import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { ConnectLink } from '../../../../lib/db'
import { ResturantModel } from '../../../../lib/Model/ResturantSchema'

export async function GET(request,content) {
    console.log(content.params.useruid)

    await mongoose.connect(ConnectLink).then((val) => {
        console.log("test connect")
    })

    let checkuser = await ResturantModel.find({ userid:content.params.useruid.toString() })

    console.log(checkuser)

    if(checkuser!=null){
        return NextResponse.json({
            data: checkuser,
            message: "GET Your RES"
        })

    }
    else{
        return NextResponse.json({
            data:[],
            message: "Not add any res"
        })
    }

}



export async function DELETE(request,content) {
    console.log(content.params.useruid)

    await mongoose.connect(ConnectLink).then((val) => {
        console.log("test connect")
    })

    let checkuser = await ResturantModel.findOneAndDelete({ _id: content.params.useruid })

    console.log(checkuser)

    if(checkuser!=null){
        return NextResponse.json({
            data: checkuser,
            message: "GET Your RES"
        })

    }
    else{
        return NextResponse.json({
            data:[],
            message: "Not add any res"
        })
    }

}