import Component, { PageEl } from "@/components/Libs/Component";
import Copy from "@/components/Libs/Copy";
import Router from "next/router";
import Window from "@/components/Libs/Window";
import TextBox from "@/components/Libs/TextBox";
import Icon2Titles from "@/components/Libs/Icon2Titles";
import Icon3Titles from "@/components/Libs/Icon3Titles";
import WindowFloat from "../Libs/WindowFloat";
import "./css.module.css";
import Block from "./Block";

export default (p) => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {
  let styles = global.styles;
  let sum = 0;
  let count = 0;
  state.faves = Array.from(new Set(state.faves))
  for(let faves of state.faves)
    {
      let book = props.books.find(ketab=>ketab.title == faves)
      if(book){sum = sum + (book.price)* 0.9}
      count = count + 1;
    }

    getProps (async ()=>{
      let bag = localStorage.getItem("bag")
      if(bag){
        state.faves = JSON.parse(bag)
      }
    })

  


  return (
    <div style={{ direction: "ltr", minHeight: "11vh" ,backgroundColor:"chocolate" }}>
      <br-x />


      <c-cc>
        <Window title=' Your shopping bag ' style={{height:150 ,width: "97%" , fontFamily:"cursive", backgroundImage:'url("https://t4.ftcdn.net/jpg/03/40/07/85/360_F_340078556_YD52qpLaiTbO5E0OF90FuOaAq3sZr8yF.jpg")'}}>
          <f-cse style={{paddingTop:35}}>
          
               <f-cc style={{backgroundColor:"lab(70.23 5.95 29.49)",height:"60px" , width:"30%" , borderRadius:"10px" , boxShadow:"15px 15px 20px"}}> <img src="https://images.vexels.com/content/267831/preview/winter-cozy-books-icon-d2a78b.png" 
                 style={{width:"3rem"}}></img> &nbsp; <f-20 style={{fontFamily:"monospace"}}> Selected books: {count} </f-20> 
               </f-cc>

               
               <f-cc style={{backgroundColor:"lab(70.23 5.95 29.49)", height:"60px" , width:"30%" , borderRadius:"10px" , boxShadow:"15px 15px 20px"}}> <img src="https://cdn-icons-png.flaticon.com/512/10384/10384161.png" 
                 style={{width:"3rem"}}></img> &nbsp; <f-20 style={{fontFamily:"monospace"}}> Total price: {sum} </f-20>
               </f-cc>

              
              
            </f-cse>
        </Window>
      </c-cc>







      {state.form == "details" ? (
        <WindowFloat
        style={{fontFamily:"serif"}}
          title="Details"
          onclose={() => {
            delete state.form;
            refresh();
          }}
        >
          <f-c>
            <f-15>Title: </f-15>
            <sp-2 />
            <f-15>{state.book.title}</f-15>
          </f-c>

          <f-c>
            <f-15>Author: </f-15>
            <sp-2 />
            <f-15>{state.book.author}</f-15>
          </f-c>

          <f-c>
            <f-15>Country: </f-15>
            <sp-2 />
            <f-15>{state.book.country}</f-15>
          </f-c>

          <f-c>
            <f-15>Language: </f-15>
            <sp-2 />
            <f-15>{state.book.language}</f-15>
          </f-c>

          <f-c>
            <f-15>Pages: </f-15>
            <sp-2 />
            <f-15>{state.book.pages}</f-15>
          </f-c>

          <g-b
            style={{ backgroundColor: state.faves.includes(state.book.title) ? "red" : "green" }}
            onClick={() => {
              


              if(state.faves.includes(state.book.title)){
                state.faves = state.faves.filter(item => item !== state.book.title)
                localStorage.setItem("bag", JSON.stringify(state.faves))
                state.form = null
              } else {
                state.faves.push(state.book.title)
                localStorage.setItem("bag", JSON.stringify(state.faves))
                state.form = null

              }
              
              refresh();
            }}
          >
            {state.faves.includes(state.book.title) ?
            <f-15 style={{color:"lightgray" , fontFamily:"cursive"}}> Remove from bag </f-15> : <f-15 style={{color:"lightgray" , fontFamily:"cursive"}}> Add to bag </f-15> }
          </g-b>
        </WindowFloat>
      ) : null}

      <Window
        title =  { " Turing Bookshop :) "  }
        style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)", fontFamily:"cursive",
          backgroundImage: `url(${"https://cdn.prod.website-files.com/5f64854a08f25af4fc8763b6/622b2a8c5ae8dd46d414abf1_bookshop.jpg"})`}}
      >
        <w-cse style={{gap:30}}>
          {props.books.map((book) => {
            return <Block book={book} state={state} refresh={refresh} />;
          })}
        </w-cse>
      </Window>
    </div>
  )
}

export async function getServerSideProps(context) {
  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let books = await global.db.collection("books").find({}).toArray();

  for (let book of books) {
    book.imageLink =
      "https://irmapserver.ir/research/ex/books/" + book.imageLink;
  }

  return {
    props: {
      data: global.QSON.stringify({
        session,
        books,
        // nlangs,
      }),
    },
  };
}