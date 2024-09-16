
export const updateScreenSize = () => {
    if (window.matchMedia('(min-width: 1920px)').matches) {
        return '3xl'
    }else if (window.matchMedia('(min-width: 1536px)').matches) {
        return '2xl'
    } else if (window.matchMedia('(min-width: 1280px)').matches) {
        return 'xl'
    } else if (window.matchMedia('(min-width: 1024px)').matches) {
        return 'lg'
    } else if (window.matchMedia('(min-width: 768px)').matches) {
        return 'md'
    } else {
        return 'sm'
    }
}