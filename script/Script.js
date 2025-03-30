// Inicializa o editor quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Declaração das variáveis globais
    let menuItems = []; // Array para armazenar os itens do menu
    
    // Função para inicializar o editor
    function init() {
        // Adicionar alguns itens de menu iniciais como exemplo
        addInitialMenuItems();
        
        // Configurar os event listeners para os controles
        setupEventListeners();
        
        // Renderizar o menu pela primeira vez
        updateMenuPreview();
    }
    
    // Adiciona alguns itens iniciais ao menu
    function addInitialMenuItems() {
        menuItems = ['Página Inicial', 'Produtos', 'Sobre Nós', 'Contato'];
        updateMenuItemsControls(); // Atualiza os controles com os itens iniciais
    }
    
    // Configura os event listeners para todos os controles do editor
    function setupEventListeners() {
        // Botões principais
        document.getElementById('addMenuItem').addEventListener('click', handleAddMenuItem); /*Esta linha busca o botão com o id "addMenuItem" na página HTML
        Adiciona um "ouvinte de evento" que monitora cliques nesse botão
        Quando o botão é clicado, a função handleAddMenuItemé executada
        Em termos simples: "quando alguém clica no botão 'Adicionar Item', chama a função que adiciona um novo item ao menu"*/
        document.getElementById('clearAllItems').addEventListener('click', handleClearAllItems);
        /*Esta linha busca o botão com o id "clearAllItems" na página HTML
        Adiciona um "ouvinte de evento" que monitora cliques nesse botão
        Quando o botão é clicado, a função handleClearAllItemsé executada
        Em termos simples: "quando alguém clica no botão 'Limpar Tudo', chama a função que remove todos os itens do menu"*/
        
        // Event listeners para os controles de estilo
        document.getElementById('menuImageURL').addEventListener('input', updateMenuPreview);
        document.querySelectorAll('input[name="imagePosition"]').forEach(radio => {
            radio.addEventListener('change', updateMenuPreview);
        });
        document.querySelectorAll('input[name="menuOrientation"]').forEach(radio => {
            radio.addEventListener('change', updateMenuPreview);
        });
        
        // Cores
        document.getElementById('menuBackgroundColor').addEventListener('input', updateMenuPreview);
        document.getElementById('menuItemBackgroundColor').addEventListener('input', updateMenuPreview);
        document.getElementById('menuTextColor').addEventListener('input', updateMenuPreview);
        document.getElementById('menuBorderColor').addEventListener('input', updateMenuPreview);
        
        // Tamanhos e espaçamentos
        document.getElementById('menuFontSize').addEventListener('input', function(e) {
            document.getElementById('menuFontSizeValue').textContent = e.target.value + 'px';
            updateMenuPreview();
        });
        
        document.getElementById('menuItemPadding').addEventListener('input', function(e) {
            document.getElementById('menuItemPaddingValue').textContent = e.target.value + 'px';
            updateMenuPreview();
        });
        
        document.getElementById('menuItemMargin').addEventListener('input', function(e) {
            document.getElementById('menuItemMarginValue').textContent = e.target.value + 'px';
            updateMenuPreview();
        });
        
        // Bordas
        document.getElementById('menuBorderWidth').addEventListener('input', function(e) {
            document.getElementById('menuBorderWidthValue').textContent = e.target.value + 'px';
            updateMenuPreview();
        });
        
        document.getElementById('menuBorderRadius').addEventListener('input', function(e) {
            document.getElementById('menuBorderRadiusValue').textContent = e.target.value + 'px';
            updateMenuPreview();
        });
        
        document.getElementById('menuBorderStyle').addEventListener('change', updateMenuPreview);
    }
    
    // Adiciona um novo item ao menu
    function handleAddMenuItem() {
        menuItems.push('Novo Item'); // Adiciona um novo item com texto padrão
        updateMenuItemsControls(); // Atualiza os controles com o novo item
        updateMenuPreview(); // Atualiza a visualização do menu
    }
    
    // Remove todos os itens do menu
    function handleClearAllItems() {
        if (confirm('Tem certeza que deseja remover todos os itens do menu?')) {
            menuItems = []; // Limpa o array de itens
            updateMenuItemsControls(); // Atualiza os controles
            updateMenuPreview(); // Atualiza a visualização
        }
    }
    
    // Função para remover um item específico do menu
    function handleRemoveMenuItem(index) {
        menuItems.splice(index, 1); // Remove o item pelo índice
        updateMenuItemsControls(); // Atualiza os controles
        updateMenuPreview(); // Atualiza a visualização
    }
    
    // Atualiza os controles de edição de itens do menu
    function updateMenuItemsControls() {
        const menuItemsContainer = document.getElementById('menuItems');
        menuItemsContainer.innerHTML = ''; // Limpa o container
        
        // Para cada item no array, cria um controle de edição
        menuItems.forEach((item, index) => {
            const itemControl = document.createElement('div');
            itemControl.className = 'menu-item-control';
            
            const itemInput = document.createElement('input');
            itemInput.type = 'text';
            itemInput.className = 'form-control';
            itemInput.value = item;
            itemInput.dataset.index = index;
            itemInput.addEventListener('input', function() {
                // Atualiza o texto do item no array quando o usuário digitar
                menuItems[this.dataset.index] = this.value;
                updateMenuPreview();
            });
            
            const removeButton = document.createElement('button');
            removeButton.className = 'btn btn-sm btn-danger ms-2';
            removeButton.innerHTML = '&times;';
            removeButton.addEventListener('click', function() {
                handleRemoveMenuItem(index);
            });
            
            itemControl.appendChild(itemInput);
            itemControl.appendChild(removeButton);
            menuItemsContainer.appendChild(itemControl);
        });
    }
    
    // Atualiza a visualização do menu com base nas configurações atuais
    function updateMenuPreview() {
        const previewContainer = document.getElementById('menuPreview');
        
        // Limpa o container de visualização
        previewContainer.innerHTML = '';
        
        // Obtém todas as configurações atuais
        const imageURL = document.getElementById('menuImageURL').value;
        const imagePosition = document.querySelector('input[name="imagePosition"]:checked').value;
        const menuOrientation = document.querySelector('input[name="menuOrientation"]:checked').value;
        const menuBackgroundColor = document.getElementById('menuBackgroundColor').value;
        const menuItemBackgroundColor = document.getElementById('menuItemBackgroundColor').value;
        const menuTextColor = document.getElementById('menuTextColor').value;
        const menuFontSize = document.getElementById('menuFontSize').value;
        const menuItemPadding = document.getElementById('menuItemPadding').value;
        const menuItemMargin = document.getElementById('menuItemMargin').value;
        const menuBorderWidth = document.getElementById('menuBorderWidth').value;
        const menuBorderColor = document.getElementById('menuBorderColor').value;
        const menuBorderStyle = document.getElementById('menuBorderStyle').value;
        const menuBorderRadius = document.getElementById('menuBorderRadius').value;
        
        // Container principal do menu
        const menuContainer = document.createElement('div');
        menuContainer.className = 'menu-preview';
        
        // Se houver imagem e a posição for à esquerda, cria um container flexível
        if (imageURL && imagePosition === 'left') {
            menuContainer.style.display = 'flex';
            menuContainer.style.alignItems = 'center';
            menuContainer.style.gap = '20px';
        }
        
        
        // Adiciona a imagem se houver uma URL
        if (imageURL) {
            const menuImage = document.createElement('img');
            menuImage.src = imageURL;
            menuImage.alt = 'Menu Image';
            menuImage.className = 'menu-image';
            menuImage.style.maxHeight = '100px'; // Limita a altura da imagem
            
            if (imagePosition === 'above' || !imagePosition) {
                menuContainer.appendChild(menuImage);
            } else if (imagePosition === 'left') {
                menuContainer.appendChild(menuImage);
            }
        }
        
        // Cria a lista de menu
        const menuList = document.createElement('ul');
        menuList.className = 'menu-list ' + (menuOrientation === 'vertical' ? 'vertical' : 'horizontal');
        menuList.style.backgroundColor = menuBackgroundColor;
        menuList.style.border = `${menuBorderWidth}px ${menuBorderStyle} ${menuBorderColor}`;
        menuList.style.borderRadius = `${menuBorderRadius}px`;
        menuList.style.padding = '10px';
        
        // Se não houver itens, adiciona uma mensagem
        if (menuItems.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = 'Adicione itens ao menu usando os controles.';
            emptyMessage.style.fontStyle = 'italic';
            emptyMessage.style.color = '#999';
            menuList.appendChild(emptyMessage);
        } else {
            // Adiciona cada item do menu à lista
            menuItems.forEach(item => {
                const menuItem = document.createElement('li');
                menuItem.className = 'menu-item';
                menuItem.textContent = item;
                menuItem.style.backgroundColor = menuItemBackgroundColor;
                menuItem.style.color = menuTextColor;
                menuItem.style.fontSize = `${menuFontSize}px`;
                menuItem.style.padding = `${menuItemPadding}px`;
                menuItem.style.margin = `${menuItemMargin}px`;
                menuItem.style.border = `${menuBorderWidth}px ${menuBorderStyle} ${menuBorderColor}`;
                menuItem.style.borderRadius = `${menuBorderRadius}px`;
                
                // Adiciona hover effect
                menuItem.style.transition = 'all 0.3s ease';
                menuItem.addEventListener('mouseover', function() {
                    this.style.opacity = '0.8';
                });
                menuItem.addEventListener('mouseout', function() {
                    this.style.opacity = '1';
                });
                
                menuList.appendChild(menuItem);
            });
        }
        
        // Adiciona a lista ao container
        if (imagePosition === 'left' && imageURL) {
            // Já adicionou a imagem, agora adiciona o menu
            menuContainer.appendChild(menuList);
        } else {
            // Adiciona o menu após a imagem (ou sem imagem)
            menuContainer.appendChild(menuList);
        }
        
        // Adiciona o container ao preview
        previewContainer.appendChild(menuContainer);
    }
    
    // Inicializa o editor
    init();
});
