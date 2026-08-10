/**
 * Core UI Functions (Dependency Free)
 * Safe to load even if network is down.
 */

export const openModal = (id) => {
    const el = document.getElementById(id);
    if (el) {
        el.classList.remove('hidden');
        // Bloke scroll background lè yon modal louvri (anpeche paj dèyè a bouje).
        document.body.style.overflow = 'hidden';
    }
};

export const closeModal = (id) => {
    const el = document.getElementById(id);
    if (el) {
        el.classList.add('hidden');
        // Debloke scroll sèlman si pa gen okenn lòt modal ki louvri.
        if (!document.querySelector('.modal:not(.hidden)')) {
            document.body.style.overflow = '';
        }
    }
};

export const toggleSidebar = () => {
    document.querySelector('.sidebar')?.classList.toggle('mobile-open');
};

export const closeSidebar = () => {
    document.querySelector('.sidebar')?.classList.remove('mobile-open');
};
