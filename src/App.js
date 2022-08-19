import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import un from './un.png';
import deux from './deux.png';
import trois from './trois.png';

function App() {
    const [currentSaveur, setCurrentSaveur] = useState(null);
    const [durationLevel1, setDurationLevel1] = useState(2000);
    const [durationLevel2, setDurationLevel2] = useState(3000);
    const [durationLevel3, setDurationLevel3] = useState(4000);
    const [showParam, setShowParam] = useState(false);
    const [durationNettoyage, setDurationNettoyage] = useState(10000);
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState(false);
    const saveurs = [1, 2, 3, 4, 5, 6];
    const colors = ['#ffc107', '#f44336','#e91e63',  '#00bcd4', '#8bc34a', 'white'];

    const stopProgram = () => {
        const url = 'http://localhost:9000/stopAlert';

        fetch(url)
            .then((response => {
                setIsLoading(false);
                setCurrentSaveur(null);
            }))
            .catch((error) => {
                setIsLoading(false);
                setCurrentSaveur(null);
            })
    }

    const startProgram = (saveur, level) => {
        if (isLoading === false) {
            setIsLoading(true);
            let timems = durationLevel1;
            if (saveur === 6) {
                timems = durationNettoyage;
            } else if (level === 2) {
                timems = durationLevel2;
            } else if (level === 3) {
                timems = durationLevel3;
            }
            const url = 'http://localhost:9000/command/' + saveur + '/' + timems;

            fetch(url)
                .then((response => {
                    setIsLoading(false);
                    setCurrentSaveur(null);
                }))
                .catch((error) => {
                    setIsLoading(false);
                    setCurrentSaveur(null);
                })
        }
    }

    return (
        <div className="App">
            <header className="App-header">

                <div className="wrapper">
                    {saveurs.map((saveur => {
                        if (saveur === currentSaveur) {
                            if (isLoading) {
                                return <div className="item" style={{boxShadow: '1px 2px 4px #4e4e4e', borderColor: colors[saveur-1]}}><img src={logo} className="App-logo" alt="logo"/></div>
                            }
                            if (saveur === 6) {
                                return <div className="item" style={{boxShadow: '1px 2px 4px #4e4e4e', borderColor: colors[saveur-1]}}>
                                    <div style={{flexDirection: 'column'}}>
                                        <input name={"code"} placeholder={"Entrer le code"}
                                               onChange={(e) => setCode(e.target.value)}/>
                                        <div onClick={() => {
                                            if (code === '12340z') {
                                                setCode(null);
                                                startProgram(saveur, 1);
                                            }
                                        }} style={{alignItems: 'center', height: 68, display: 'flex'}}>VALIDER
                                        </div>
                                    </div>
                                </div>;
                            }
                            return (<div className="item" style={{boxShadow: '1px 2px 4px #4e4e4e', borderColor: colors[saveur-1]}}>
                                <div style={{flexDirection: 'column'}}>
                                    <div onClick={() => startProgram(saveur, 1)} style={{
                                        alignItems: 'center',
                                        height: 66,
                                        width: 200,
                                        borderRadius: 15,
                                        justifyContent: 'center',
                                        display: 'flex',
                                        color: 'WHITE'
                                    }}>
                                        <span style={{fontSize: 18}}>Concentration faible</span><img src={un} style={{borderRadius: 5, marginLeft: 5}} width={30} height={50} alt="logo" />
                                    </div>
                                    <div onClick={() => startProgram(saveur, 2)} style={{
                                        alignItems: 'center',
                                        height: 66,
                                        width: 200,
                                        borderRadius: 15,
                                        justifyContent: 'center',
                                        display: 'flex',
                                        color: 'WHITE'

                                    }}>
                                        <span style={{fontSize: 18}}>Concentration moyenne</span><img src={deux} style={{borderRadius: 5, marginLeft: 5}} width={30} height={50} alt="logo" />

                                    </div>
                                    <div onClick={() => startProgram(saveur, 3)} style={{
                                        alignItems: 'center',
                                        height: 66,
                                        width: 200,
                                        borderRadius: 15,
                                        justifyContent: 'center',
                                        display: 'flex',
                                        color: 'WHITE'

                                    }}>
                                        <span style={{fontSize: 18}}>Concentration élévée</span><img src={trois} style={{borderRadius: 5, marginLeft: 5}} width={30} height={50} alt="logo" />

                                    </div>
                                </div>
                            </div>);
                        }
                        return <div className="item" style={{boxShadow: '1px 2px 4px black',
                             borderColor: colors[saveur-1]}} onClick={() => {
                            if (isLoading === false) {
                                setCurrentSaveur(saveur);
                            }
                        }}>
                            {saveur === 6 ? <>NETTOYAGE</> : <>SAVEUR {saveur}</>}</div>
                    }))}
                </div>


                <div onClick={() => stopProgram()} style={{
                    marginTop: 10,
                    alignItems: 'center',
                    height: 50,
                    width: 100,
                    borderRadius: 5,
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'rgb(255,0,89)'
                }}>STOP
                </div>

                <div style={{marginTop:10}} >
                    <span onClick={() => setShowParam(!showParam)}>Paramétres</span>
                    {showParam && <>
                        <div>Durée Niveau 1 <input name={"durationLevel1"} value={durationLevel1}
                                                   onChange={(e) => setDurationLevel1(e.target.value)}/></div>
                        <div>Durée Niveau 2 <input name={"durationLevel2"} value={durationLevel2}
                                                   onChange={(e) => setDurationLevel2(e.target.value)}/></div>
                        <div>Durée Niveau 3 <input name={"durationLevel3"} value={durationLevel3}
                                                   onChange={(e) => setDurationLevel3(e.target.value)}/></div>
                        <div>Durée Nettoyage <input name={"durationnNettoyage"} value={durationNettoyage}
                                                    onChange={(e) => setDurationNettoyage(e.target.value)}/></div>
                    </>}
                </div>
            </header>
        </div>
    );
}

export default App;
