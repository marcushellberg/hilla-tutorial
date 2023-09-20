package com.example.application.db;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final CompanyRepository companyRepository;
    private final ContactRepository contactRepository;

    public DataInitializer(CompanyRepository companyRepository, ContactRepository contactRepository) {
        this.companyRepository = companyRepository;
        this.contactRepository = contactRepository;
    }

    @Override
    public void run(String... args) {
        if (companyRepository.findAll().isEmpty()) {
            // Create and save companies
            Company vaadin = companyRepository.save(new Company("Vaadin"));
            Company techCorp = companyRepository.save(new Company("TechCorp"));
            Company greenSoft = companyRepository.save(new Company("GreenSoft"));

            // Create and save contacts
            contactRepository.save(new Contact("John", "Doe", "john.doe@vaadin.com", vaadin));
            contactRepository.save(new Contact("Jane", "Doe", "jane.doe@vaadin.com", vaadin));
            contactRepository.save(new Contact("Alice", "Smith", "alice.smith@vaadin.com", vaadin));

            contactRepository.save(new Contact("Bob", "Williams", "bob.williams@techcorp.com", techCorp));
            contactRepository.save(new Contact("Charlie", "Brown", "charlie.brown@techcorp.com", techCorp));

            contactRepository.save(new Contact("David", "Clark", "david.clark@greensoft.com", greenSoft));
            contactRepository.save(new Contact("Emily", "Davis", "emily.davis@greensoft.com", greenSoft));
            contactRepository.save(new Contact("Frank", "Thomas", "frank.thomas@greensoft.com", greenSoft));
            contactRepository.save(new Contact("Grace", "Harris", "grace.harris@greensoft.com", greenSoft));
            contactRepository.save(new Contact("Hannah", "King", "hannah.king@greensoft.com", greenSoft));
        }
    }
}
