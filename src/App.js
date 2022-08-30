import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import citron from './1.png';
import fraise from './12.png';
import orange from './123.png';
import kiwi from './1234.png';
import banane from './12345.png';
import cassis from './123456.png';

function App() {
    const [currentSaveur, setCurrentSaveur] = useState(null);
    const [durationLevel1, setDurationLevel1] = useState(2000);
    const [durationLevel2, setDurationLevel2] = useState(3000);
    const [durationLevel3, setDurationLevel3] = useState(4000);
    const [showAll, setShowAll] = useState(false);

    const [showParam, setShowParam] = useState(false);
    const [durationEau, setDurationEau] = useState(10000);
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState(false);
    const saveurs = [1, 2, 3, 4, 5, 6];
    const colors = ['#ffdb72', '#f44336', '#e9841e', '#45c71c', '#8bc34a', '#3300cb'];
    const saveursPhoto = [citron, fraise, orange, kiwi, banane, cassis];

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
            if (level === 2) {
                timems = durationLevel2;
            } else if (level === 3) {
                timems = durationLevel3;
            }
            const url = 'http://localhost:9000/command/' + saveur + '/' + timems + '/' + durationEau;

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
        <div className="App-header">

            <div style={{position: 'absolute', top: 75, color: '#03a9f4', fontWeight: 'bold'}}>
                {currentSaveur === null && <>Sélectionner un parfum</>}
                {currentSaveur !== null && <>Sélectionner une concentation</>}

            </div>
            <div className="wrapper">
                {saveurs.map((saveur => {
                    if (saveur === currentSaveur) {
                        if (isLoading) {
                            return <div style={{
                                alignItems: 'center',
                                width: '100%',
                                justifyContent: 'center',
                                display: 'flex',
                            }} >
                                <img src={logo} className="App-logo" alt="logo"/></div>
                        }

                        return (<div>
                            <div style={{flexDirection: 'column'}}>
                                <div onClick={() => startProgram(saveur, 1)} style={{
                                    alignItems: 'center',
                                    height: 66,
                                    width: '100%',
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}>
                                    <span style={{color: 'black',fontSize: 18, fontWeight: 'bold'}}>Faible</span></div>
                                <div onClick={() => startProgram(saveur, 2)} style={{
                                    alignItems: 'center',
                                    height: 66,
                                    width: '100%',
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}>
                                    <span style={{color: 'black',fontSize: 18, fontWeight: 'bold'}}>Moyenne</span>
                                </div>
                                <div onClick={() => startProgram(saveur, 3)} style={{
                                    alignItems: 'center',
                                    height: 66,
                                    width: '100%',
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}>
                                                <span style={{color: 'black',fontSize: 18, fontWeight: 'bold',}}>Forte</span>

                                </div>
                            </div>
                        </div>);
                    }
                    return <div style={{marginRight: 4}} onClick={() => {
                        if (isLoading === false) {
                            setCurrentSaveur(saveur);
                        }}}> <img  src={saveursPhoto[saveur - 1]} width={'100%'}
                                /></div>
                }))}
            </div>


            {showAll && <>
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

            <div style={{marginTop: 10}}>
                <span onClick={() => setShowParam(!showParam)}>Paramétres</span>
                {showParam && <>
                    <div>Durée Niveau 1 <input name={"durationLevel1"} value={durationLevel1}
                                               onChange={(e) => setDurationLevel1(e.target.value)}/></div>
                    <div>Durée Niveau 2 <input name={"durationLevel2"} value={durationLevel2}
                                               onChange={(e) => setDurationLevel2(e.target.value)}/></div>
                    <div>Durée Niveau 3 <input name={"durationLevel3"} value={durationLevel3}
                                               onChange={(e) => setDurationLevel3(e.target.value)}/></div>
                    <div>Durée Eau <input name={"durationnNettoyage"} value={durationEau}
                                          onChange={(e) => setDurationEau(e.target.value)}/></div>
                </>}
            </div>
           </>}
        </div>
    );
}

export default App;
