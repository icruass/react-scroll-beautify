import React from 'react';
import Scroll from 'react-scroll-beautify';

function ScrollX() {
    return (
        <div>
            <div style={{ color: '#2c3e50', fontWeight: 600, marginBottom: 20 }}>
                仅横向滚动条
            </div>

            <Scroll style={{ width: '100%', maxWidth: 600 }}>
                <div style={{
                    position: 'relative',
                    width: 3000,
                    height: 300,
                    background: 'radial-gradient(aqua, transparent)',
                }}>
                    <div style={{ position: 'absolute', top: 0 }}>scroll content top</div>
                    <div style={{ position: 'absolute', top: 0, right: 0 }}>scroll content top right</div>
                    <div style={{ position: 'absolute', top: '50%' }}>scroll content center</div>
                    <div style={{ position: 'absolute', top: '50%', right: 0 }}>
                        scroll content center right
                    </div>
                    <div style={{ position: 'absolute', bottom: 0 }}>scroll content bottom</div>
                    <div style={{ position: 'absolute', bottom: 0, right: 0 }}>scroll content bottom right</div>
                </div>
            </Scroll>
        </div>
    );
}

function ScrollY() {
    return (
        <div>
            <div style={{ color: '#2c3e50', fontWeight: 600, marginBottom: 20 }}>
                仅纵向滚动条
            </div>
            <Scroll style={{ height: 300, width: '100%', maxWidth: 600 }}
            >
                <div style={{
                    position: 'relative',
                    height: 3000,
                    background: 'radial-gradient(aqua, transparent)',
                }}
                >
                    <div style={{ position: 'absolute', top: 0 }}>scroll content top</div>
                    <div style={{ position: 'absolute', top: 0, right: 0 }}>scroll content top right</div>
                    <div style={{ position: 'absolute', top: '50%' }}>scroll content center</div>
                    <div style={{ position: 'absolute', top: '50%', right: 0 }}>
                        scroll content center right
                    </div>
                    <div style={{ position: 'absolute', bottom: 0 }}>scroll content bottom</div>
                    <div style={{ position: 'absolute', bottom: 0, right: 0 }}>scroll content bottom right</div>
                </div>
            </Scroll>
        </div>
    );
}

function ScrollMultinest() {
    return (
        <div>
            <div style={{ color: '#2c3e50', fontWeight: 600, marginBottom: 20 }}>
                嵌套
            </div>
            <div style={{ height: 600, display: 'flex', }}>
                <div style={{ height: '100%', width: 380, }}>
                    <Scroll scroll={{ x: '100%', y: '100%' }}>
                        <div style={{
                            width: 2000,
                            height: 600,
                            boxSizing: 'border-box',
                            padding: '12px 16px',
                            backgroundImage: 'linear-gradient(25deg, #d93b71, #e0858d, #dfc1ab, #d4fbc9)',
                        }} />
                    </Scroll>
                </div>

                <div style={{ height: '100%', flex: 1, minWidth: 0 }}>
                    <Scroll scroll={{ x: '100%', y: '100%' }}>
                        <div style={{
                            width: '100%',
                            minWidth: 500,
                            height: 1200,
                            boxSizing: 'border-box',
                            padding: '12px 16px',
                            backgroundImage: 'linear-gradient(25deg, #f1693a, #f9886e, #fca6a3, #f9c4d9)',
                        }}>
                            <Scroll
                                scroll={{ x: 300, y: 300 }}
                                style={{ margin: '100px', position: 'sticky', top: 0 }}
                            >
                                <Scroll style={{ position: 'absolute', left: 100, top: 100 }} scroll={{ x: 100, y: 100 }}>
                                    <div style={{
                                        width: 300,
                                        height: 300,
                                        boxSizing: 'border-box',
                                        padding: '12px 16px',
                                        backgroundImage: 'linear-gradient(25deg, #d93b71, #e0858d, #dfc1ab, #d4fbc9)',
                                    }} />
                                </Scroll>

                                <div style={{
                                    width: '100%',
                                    minWidth: 900,
                                    height: 900,
                                    boxSizing: 'border-box',
                                    padding: '12px 16px',
                                    backgroundImage: 'linear-gradient(25deg, #56c1fc, #a9d4c4, #d3e987, #f1ff31)',
                                }} />
                            </Scroll>
                        </div>
                    </Scroll>
                </div>
            </div>
        </div>
    );
}

function Demo() {
    return (
        <div>
            <ScrollX />
            <div style={{ padding: '20px 0' }} />
            <ScrollY />
            <div style={{ padding: '20px 0' }} />
            <ScrollMultinest />
        </div>
    );
}

export default Demo;
