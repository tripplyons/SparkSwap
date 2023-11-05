import { ConnectButton } from '@rainbow-me/rainbowkit';
import LogoDisplayer from "./logoDisp";
export default function Nav({switcherState, OnChange}) {
  return (
    <div id="header" className="flex 10vh bg-gray-200 mb-5">
    <div className="m-4 flex-initial m-auto" >
      <div className="ml-4">
        <LogoDisplayer/>
      </div>
    </div>
    <div className="m-auto flex-1">
      
    </div>
    <div className="m-auto flex-1">
      <div className="m-4">
        <select value={switcherState} onChange={OnChange}>
            <option value={0}>Solar</option>
            <option value={1}>Wind</option>
          </select>
      </div>
    </div>
    <div className="m-4 flex-initial align-middle" >
      <ConnectButton/>
    </div>
  </div>)
}
