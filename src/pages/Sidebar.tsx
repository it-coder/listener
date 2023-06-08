
const Sidebar = () => {

      return (
            <div className="sidebar">
                  <div className="flex-scroll-wrapper">
                        <div className="menu-control"></div>
                        <div className="menu-title">
                              <div className="title">平台聚合</div>
                        </div>
                        <ul className="nav masthead-nav">
                              <li>
                                    <div className="sidebar-block">
                                          <span className="icon li-featured-list"></span>
                                          <a>精选歌单</a>
                                    </div>
                              </li>
                        </ul>
                  </div>
            </div>
      );
}

export default Sidebar;