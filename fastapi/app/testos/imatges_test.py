from main import app
from starlette.testclient import TestClient

client = TestClient(app)

def test_products():
    response = client.get("/products")
    assert response.status_code == 200
    assert response.json() == {"producte1": "asdfasdfsadfdsaf"}

def test_images_perro():
    
    body_data = {
        "prompt": "perro" 
    }
    
    expected_response = [ 
                
                "https://www.mascotasanasydivertidas.com/wp-content/uploads/sites/12/2020/11/perro.png",
                "https://www.mascotasanasydivertidas.com/wp-content/uploads/sites/12/2020/11/perro.png",
                "https://www.mascotasanasydivertidas.com/wp-content/uploads/sites/12/2020/11/perro.png"
                
            ]
    
    response = client.post("/generateImagesFake", json=body_data )
    assert response.status_code == 200
    assert response.json() == expected_response
    
def test_images_gato():
    
    body_data = {
        "prompt": "gato" 
    }
    
    expected_response = [ 
                
                "https://nutricione.es/img/cms/Home%20Nutricione/Hom/Categor%C3%ADa%20gatos/Nutricione-cabecera-categoria-gato-1.png",
                "https://nutricione.es/img/cms/Home%20Nutricione/Hom/Categor%C3%ADa%20gatos/Nutricione-cabecera-categoria-gato-1.png",
                "https://nutricione.es/img/cms/Home%20Nutricione/Hom/Categor%C3%ADa%20gatos/Nutricione-cabecera-categoria-gato-1.png"
                
            ]
    
    response = client.post("/generateImagesFake", json=body_data )
    assert response.status_code == 200
    assert response.json() == expected_response