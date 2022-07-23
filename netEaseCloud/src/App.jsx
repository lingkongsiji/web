import './App.css'
import RouterView from './routers/RouterView'
import { createContext, useState } from 'react'
export const TheContext = createContext({})
import headpot from './images/wanye.jpg'
// import './tools/login'
import getData from './tools/getData'

const uid = 1621578716
// getData(`/user/detail?uid=${uid}`)

const inituser = {
  headPortrait: headpot,
  name: '阳寒凌',
  gender: '男',
  birthday: '2002-11-17',
  location: {
    type: '直辖市',
    city: '重庆市'
  },
  university: 'cqupt',
  label: ['沉迷国风', '热爱纯音乐', '电音迷'],
  introduction: '',
  registrationTime: '2018-10'
}

export const UserContext = createContext({})

function App() {
  const [user, setUser] = useState(inituser)
  if (!user) {
    getData(`/user/detail?uid=${uid}`).then(res => {
      const { createDays, level, listenSongs, profile, profileVillageInfo } = res
      const { nickname, signature, province, birthday } = profile
      setUser({
        createDays,
        level,
        listenSongs,
        headPortrait: headpot,
        name: nickname,
        gender: '男',
        birthday: '2002-11-17',
        location: {
          type: '直辖市',
          city: '重庆市',
          // id: province
        },
        university: 'cqupt',
        label: ['沉迷国风', '热爱纯音乐', '电音迷'],
        introduction: signature,
        registrationTime: '2018-10'
      })
    })
  }
  return (
    <UserContext.Provider value={user}>
      <div className="App">
        <RouterView />
      </div>
    </UserContext.Provider>
  )
}

export default App
