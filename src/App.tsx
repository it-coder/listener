import React from 'react';
import './style/common.css'
import './style/iparanoid.css'
import { netease } from './js/provider/netease.js'


function App() {
  netease.show_playlist(`/show_playlist?offset=0&filterId=''`)
  return (
    <div className="wrapper">
      <div className="main">
        <div className="sidebar"></div>
        <div className="content">
          <div className="navigation">

          </div>
          <div className='browser flex-scroll-wrapper'>
            <div className='page page-hot-playlist'>
              <div className="source-list" >
                <div className="source-button active">
                  网易云
                </div>
                <div className="splitter"></div>
                <div className="source-button">
                  网易云
                </div>
              </div>
              <div className='playlist-filter'>
                  <div className="l1-button filter-item">
                    全部
                  </div>
                  
              </div>
              <div className='site-wrapper-innerd'>
                <div className="cover-container" id="playlist-content">
                  <ul className='playlist-covers'>
                    <li>
                      <div className="u-cover">
                        <img 
                        src="http://p2.music.126.net/sixunTcvD_IXeVqxZnpHkA==/109951163452086313.jpg?param=512y512"/>
                        <div className="bottom" >
                          <svg className="feather">
                            <use href="#play-circle"></use>
                          </svg>
                        </div>
                      </div>
                      <div className="desc">
                        <span className="title ng-binding">助眠辑 | 自然音，伴灵动乐符萦绕耳畔</span>
                      </div>
                    </li>
                    <li>
                      <div className="u-cover">
                        <img 
                        src="http://p2.music.126.net/sixunTcvD_IXeVqxZnpHkA==/109951163452086313.jpg?param=512y512"/>
                        <div className="bottom" >
                          <svg className="feather">
                            <use href="#play-circle"></use>
                          </svg>
                        </div>
                      </div>
                      <div className="desc">
                        <span className="title ng-binding">助眠辑 | 自然音，伴灵动乐符萦绕耳畔</span>
                      </div>
                    </li>
                    <li>
                      <div className="u-cover">
                        <img 
                        src="http://p2.music.126.net/sixunTcvD_IXeVqxZnpHkA==/109951163452086313.jpg?param=512y512"/>
                        <div className="bottom" >
                          <svg className="feather">
                            <use href="#play-circle"></use>
                          </svg>
                        </div>
                      </div>
                      <div className="desc">
                        <span className="title ng-binding">助眠辑 | 自然音，伴灵动乐符萦绕耳畔</span>
                      </div>
                    </li>
                    <li>
                      <div className="u-cover">
                        <img 
                        src="http://p2.music.126.net/sixunTcvD_IXeVqxZnpHkA==/109951163452086313.jpg?param=512y512"/>
                        <div className="bottom" >
                          <svg className="feather">
                            <use href="#play-circle"></use>
                          </svg>
                        </div>
                      </div>
                      <div className="desc">
                        <span className="title ng-binding">助眠辑 | 自然音，伴灵动乐符萦绕耳畔</span>
                      </div>
                    </li>
                    <li>
                      <div className="u-cover">
                        <img 
                        src="http://p2.music.126.net/sixunTcvD_IXeVqxZnpHkA==/109951163452086313.jpg?param=512y512"/>
                        <div className="bottom" >
                          <svg className="feather">
                            <use href="#play-circle"></use>
                          </svg>
                        </div>
                      </div>
                      <div className="desc">
                        <span className="title ng-binding">助眠辑111111111助眠辑111111111助眠辑111111111助眠辑111111111助眠辑111111111 | 自然音，伴灵动乐符萦绕耳畔</span>
                      </div>
                    </li>
                    <li>
                      <div className="u-cover">
                        <img 
                        src="http://p2.music.126.net/sixunTcvD_IXeVqxZnpHkA==/109951163452086313.jpg?param=512y512"/>
                        <div className="bottom" >
                          <svg className="feather">
                            <use href="#play-circle"></use>
                          </svg>
                        </div>
                      </div>
                      <div className="desc">
                        <span className="title ng-binding">助眠辑 | 自然音，伴灵动乐符萦绕耳畔</span>
                      </div>
                    </li>
                  </ul>
                
                </div>

              </div>
            </div>
          </div>
          
        </div>
      </div>
      <div className="footer">

      </div>
    </div>
  );
}

export default App;
