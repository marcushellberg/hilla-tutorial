package com.example.application.services;

import com.example.application.db.Company;
import com.example.application.db.CompanyRepository;
import com.example.application.db.Contact;
import com.example.application.db.ContactRepository;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.stereotype.Service;

import java.util.List;


@AnonymousAllowed
@BrowserCallable
@Service
public class CRMService {

    public record ContactRecord(
            Long id,
            @NotNull
            @Size(min = 1, max = 50)
            String firstName,
            @NotNull
            @Size(min = 1, max = 50)
            String lastName,
            @NotNull
            @Email
            String email,
            @NotNull
            CompanyRecord company
    ) {
    }

    public record CompanyRecord(
            @NotNull
            Long id,
            String name
    ) {
    }


    private ContactRecord toContactRecord(Contact c) {
        return new ContactRecord(
                c.getId(),
                c.getFirstName(),
                c.getLastName(),
                c.getEmail(),
                new CompanyRecord(
                        c.getCompany().getId(),
                        c.getCompany().getName()
                )
        );
    }

    private CompanyRecord toCompanyRecord(Company c) {
        return new CompanyRecord(
                c.getId(),
                c.getName()
        );
    }

    private final CompanyRepository companyRepository;
    private final ContactRepository contactRepository;

    public CRMService(CompanyRepository companyRepository, ContactRepository contactRepository) {
        this.companyRepository = companyRepository;
        this.contactRepository = contactRepository;
    }

    public List<CompanyRecord> findAllCompanies() {
        return companyRepository.findAll().stream()
                .map(this::toCompanyRecord).toList();
    }


    public List<ContactRecord> findAllContacts() {
        List<Contact> all = contactRepository.findAll();
        return all.stream()
                .map(this::toContactRecord).toList();
    }

    public ContactRecord save(ContactRecord contact) {
        var company = companyRepository.findById(contact.company.id).orElseThrow();

        var saved = contactRepository.save(new Contact(
                contact.id,
                contact.firstName,
                contact.lastName,
                contact.email,
                company
        ));

        return toContactRecord(saved);
    }

}
