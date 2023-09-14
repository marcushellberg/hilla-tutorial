package com.example.application.db;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.HashSet;
import java.util.Set;

@Entity
public class Company {
    @Id
    @GeneratedValue
    private Long id;
    @NotNull
    @Size(min = 1, max = 100)
    private String name;

    @OneToMany(mappedBy = "company")
    private Set<Contact> employees = new HashSet<>();

    public Company() {
    }

    public Company(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Contact> getEmployees() {
        return employees;
    }

    public void setEmployees(Set<Contact> employees) {
        this.employees = employees;
    }
}
