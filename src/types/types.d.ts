
// 定义平台切换方法
type TogglePlatform = (idx:string) => void;

// 定义音乐类型过滤方法
type ToggleFilter = (id:string) => void;


type GlobalConfig = {
      channelId:string
      filterId:string
}