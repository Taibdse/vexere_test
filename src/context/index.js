import React from 'react';
import { SharedProvider } from './shared.context';

function ProviderComposer({ contexts, children }) {
    return contexts.reduceRight((kids, parent) => (
        React.cloneElement(parent, {
            children: kids
        })
    ), children)
}

const GlobalContext = (props) => {
    const contexts = [<SharedProvider/>];
    
    return (
        <ProviderComposer contexts={contexts}>
            { props.children }
        </ProviderComposer>
    )
} 

export default GlobalContext;