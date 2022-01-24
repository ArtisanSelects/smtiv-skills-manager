import ElementCard from './ElementCard/ElementCard';

export default function Dashboard({ elements }) {
    return (
        <div className="row d-flex align-items-stretch justify-content-stretch">
            {Object.entries(elements).map(([elementKey, elementValue]) => <ElementCard key={elementKey} element={elementValue} />)}
        </div>
    );
}