class ExchangeRate < ApplicationRecord
  scope :admin, -> { where(admin: true) }
  scope :non_admin, -> { where(admin: false) }

  validate :valid_rate
  validate :valid_till_presence

  def valid_rate
    errors.add(:rate, :empty) if rate.nil? || rate <= 0.0
  end

  def valid_till_presence
    return unless admin

    return errors.add(:valid_till, :empty) if valid_till.nil?
    errors.add(:valid_till, :past) if valid_till < Time.now
  end

  def self.latest
    ExchangeRate.admin.where('valid_till > current_timestamp').last || ExchangeRate.non_admin.last
  end
end
