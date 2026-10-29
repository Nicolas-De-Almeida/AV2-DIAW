


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { obterVotos, calcularTotalVotos, calcularResultado, zerarVotos} from '../services/votacaoService';

function Resultado() {
    const [votos, setVotos] = useState(() => obterVotos());

    const total = calcularTotalVotos(votos);
    const resultado = calcularResultado(votos);

    function handleZerar() {
        if (window.confirm('Apagar todos os votos?')) {
            zerarVotos();
            setVotos({});
        }
    }

    return (
        <main className="pagina">
            <h1>Resultado parcial</h1>
            <p className="total-votos">
                Total de votos: <strong>{total}</strong>
            </p>

            {total === 0 ? (
                <div className="sem-votos">
                    <p>Ainda não há votos registrados.</p>
                    <Link to="/votacao" className="botao botao-principal">
                        Votar
                    </Link>
                </div>
            ) : (
                <ul className="placar">
                    {resultado.map((p, indice) => (
                        <li key={p.id} className={indice === 0 ? 'placar-item placar-lider' : 'placar-item'}>
                            <img src={p.foto} alt={p.nome} className="placar-foto" />
                            <div className="placar-info">
                                <div className="placar-topo">
                                    <h3>{p.nome}</h3>
                                    {indice === 0 && <span className="selo-lider">Sairia hoje</span>}
                                </div>
                                <div className="barra">
                                    <div className="barra-preenchida" style={{ width: `${p.percentual}%` }}/>
                                </div>
                                <p>
                                    {p.votos} {p.votos === 1 ? 'voto' : 'votos'} (
                                    {p.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%)
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <button type="button" className="botao botao-perigo" onClick={handleZerar}>
                Zerar votação
            </button>
        </main>
    );
}

export default Resultado;