
const Layout= ({children}:any) => {

      return (
            <div className='body' >
                  <div
                        id="feather-container"
                        style={{visibility: "hidden", position: "absolute", width: "0px", height: "0px"}}>
                  </div>
            
                  <div className="wrapper">
                        {children}
                  </div>
            </div>
      );
}

export default Layout;