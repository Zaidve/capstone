from .models import CarMake, CarModel


def initiate():
    car_make_data = [
        {"name": "NISSAN", "description": "Great cars. Japanese technology",
         "country": "Japan"},
        {"name": "Mercedes", "description": "Great cars. German technology",
         "country": "Germany"},
        {"name": "Audi", "description": "Great cars. German technology",
         "country": "Germany"},
        {"name": "Kia", "description": "Great cars. Korean technology",
         "country": "South Korea"},
        {"name": "Toyota", "description": "Great cars. Japanese technology",
         "country": "Japan"},
    ]

    makes = []
    for data in car_make_data:
        makes.append(CarMake.objects.create(**data))

    car_model_data = [
        ("Pathfinder", "SUV", 2023, 0), ("Qashqai", "SUV", 2023, 0),
        ("XTRAIL", "SUV", 2023, 0),
        ("A-Class", "SUV", 2023, 1), ("C-Class", "SUV", 2023, 1),
        ("E-Class", "SUV", 2023, 1),
        ("A4", "SUV", 2023, 2), ("A5", "SUV", 2023, 2),
        ("A6", "SUV", 2023, 2),
        ("Sorrento", "SUV", 2023, 3), ("Carnival", "SUV", 2023, 3),
        ("Cerato", "Sedan", 2023, 3),
        ("Corolla", "Sedan", 2023, 4), ("Camry", "Sedan", 2023, 4),
        ("Kluger", "SUV", 2023, 4),
    ]
    for name, car_type, year, make_idx in car_model_data:
        CarModel.objects.create(
            name=name, type=car_type, year=year, car_make=makes[make_idx]
        )
