export default (props) => {
    if (!props.state.faves) {
      props.state.faves = [];
    }
    let book = props.book;
  
    return (
      <f-cse
        onClick={() => {
          props.state.form = "details";
          props.state.book = book;
          props.refresh();
        }}
        style={{
          
          border:"solid white",
          padding:"0px",
          marginTop:"15px",
          borderRadius: "15px",
          backgroundColor: "white",
          boxShadow: "20px 20px 25px " , 
          height:"300px" , width:"400px"
          
        }}
      >
        <img
          className={global.styles.hoverzoom_nofade}
          src={book.imageLink}
          style={{
            borderRadius: "15px 2px 2px 15px",
            height: "100%",
            minWidth: 200,
            objectFit: "fill",
          }}
        />
  
        <w-cse
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            paddingTop: 10,
          }}
         >
          <c-cc><f-13 style={{ fontFamily: "serif" , fontWeight:"bold",paddingBottom:"80px"}}>{book.title}</f-13></c-cc>
          <w-cse style={{ width: "100%" }}>
            {props.state.faves.includes(props.book.title) ? (
              
              <img
                src="https://uxwing.com/wp-content/themes/uxwing/download/e-commerce-currency-shopping/check-out-icon.png"
                alt=""
                style={{
                  objectFit: "contain",
                  width: 70,
                  marginLeft: 5,
                  
                }}
              />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/4379/4379876.png"
                style={{
                  objectFit: "contain",
                  width: 65,
                  marginLeft: 5,
                  paddingBottom:"0px"
                }}
              />
            )}
            <c-cc
              style={{
                display: "flex",
                marginTop:"30px",
                padding: 20,
                width: "100%",
              }}
             >
             
                <del style={{ fontSize: 14 , color:"red", fontFamily:"vrb"}}>
                  
                  {(book.price as number).toLocaleString("fa-IR")} تومان
                </del>
                <p style={{color:"limegreen" , fontFamily:"vrb", fontSize:19}}>
                  
                  {((book.price * 0.9) as number).toLocaleString("fa-IR")} تومان
                    
              </p>
              
            </c-cc>
          </w-cse>
        </w-cse>
      </f-cse>
    );
  };