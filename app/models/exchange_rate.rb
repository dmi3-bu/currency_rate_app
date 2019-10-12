class ExchangeRate < ApplicationRecord
  default_scope { where(deleted_at: nil) }
  scope :admin, -> { where(admin: true) }
  scope :non_admin, -> { where(admin: false) }

  def self.latest
    ExchangeRate.admin.where('valid_till > current_timestamp').last || ExchangeRate.non_admin.last
  end
end
