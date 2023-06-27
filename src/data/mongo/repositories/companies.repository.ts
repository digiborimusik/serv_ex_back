import { AppError } from "../../../core/errors";
import { NewCompany } from "../../../domain/dto/new_company";
import { Company } from "../../../domain/entities/company";
import { CompaniesRepository } from "../../../domain/repositories/companies.repository";
import { CompanyModel } from "../models/company";

export class CompaniesRepositoryMongoImpl implements CompaniesRepository {
    async createCompany(newCompany: NewCompany): Promise<Company> {
        const company = await CompanyModel.create(newCompany);
        return company.toObject();
    }

    async updateMembers(id: string, membersIds: string[]): Promise<Company> {
        const company = await CompanyModel.findByIdAndUpdate(id, { membersIds });
        if (!company) throw new AppError("Company not found", 404);
        return company.toObject();
    }

    async getCompanyById(id: string): Promise<Company> {
        const company = await CompanyModel.findById(id);
        if (!company) throw new AppError("Company not found", 404);
        return company.toObject();
    }

    async getCompaniesByMemberId(userId: string): Promise<Company[]> {
        const companies = await CompanyModel.find({ membersIds: userId });
        return companies.map((company) => company.toObject());
    }
}
