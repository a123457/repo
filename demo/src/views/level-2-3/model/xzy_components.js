//图片组件设置
function get (props) {
    switch (props.data.type) {
        case 'img':
            return {
                render: h => {
                    return h('div', [
                        h('p', '图片组件'),
                        h('img', {
                            attrs: {
                                src: props.data.url,
                                height: 300,
                                weight: 400

                            }
                        })
                    ]);
                }
            }
            break;
        case 'video':
            return {
                render: (h) => {
                    return h('div', [
                        h('p', '视频组件'),
                        h('video', {
                            attrs: {
                                src: props.data.url,
                                controls: 'controls',
                                autoplay: 'autoplay'
                            }
                        })
                    ]);
                }
            }
            break;
        case 'text':
            return {
                props: ['data'],
                render: (h) => {
                    return h('div', [
                        h('p', '文本组件'),
                        h('p', props.data.content)
                    ]);
                }
            }
            break;
        default:
            console.log('xzy is cool')
    }
}

export default {
    functional: true,
    name: 'xzyComponent',
    props: {
        data: {
            type: Object,
            required: true,
            default: () => { }
        }
    },
    render: (h, { props, children }) => {
        // console.log(content.props.data)
        return h(get(props), children)
    }
}
