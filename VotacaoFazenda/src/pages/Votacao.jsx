


import { useState } from 'react';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard';
import { listarNaRoca, listarForaDaRoca, registrarVoto} from '../services/votacaoService';

function Votacao() {
    const naRoca = listarNaRoca();
    const foraDaRoca = listarForaDaRoca();

    const [ultimoVoto, setUltimoVoto] = useState(null);
    const [votosNaSessao, setVotosNaSessao] = useState(0);

    function handleVotar(participante) {
        registrarVoto(participante.id);
        setUltimoVoto(participante);
        setVotosNaSessao(votosNaSessao + 1)
    }

    return (
        <main className="pagina">
            <h1>Quem deve sair da roça?</h1>

            {ultimoVoto !== null && (
                <div className="confirmacao">
                    <p>
                        Voto registrado para eliminar <strong>{ultimoVoto.nome}</strong>.
                        Você ja votou {votosNaSessao} {votosNaSessao === 1 ? 'vez' : 'vezes'}.
                    </p>
                    <Link to="/resultado" className="botao botao-secundario">
                        Ver resultado
                    </Link>
                </div>
            )}

            <section>
                <h2>Na roça</h2>
                <div className="grade-roca">
                    {naRoca.map((p) => (
                        <ParticipanteCard key={p.id} participante={p} onVotar={handleVotar} />
                    ))}
                </div>
            </section>

            <section>
                <h2>Demais peões</h2>
                <div className="grade-peoes">
                    {foraDaRoca.map((p) => (
                        <ParticipanteCard key={p.id} participante={p} />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Votacao;